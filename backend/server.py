from flask import Flask, request
from flask_socketio import SocketIO, send, join_room, emit
from flask_cors import CORS
import random
import string

from logic import Game

app = Flask(__name__)

app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, cors_allowed_origins='*')
CORS(app, resources={r"/*": {"origins": "*"}})


activeGames = {}


@socketio.on('createRoom')
def create_game(data):
    if 'username' in data:
        hostUserName = data['username']
    else:
        send("Error: Username not provided.", to=request.sid)
        return
    if not hostUserName:
        send("Error: Username is required.", to=request.sid)
        return
    
    room = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
    game = Game(room, hostUserName, request.sid)
    activeGames[room] = game
    join_room(room)
    emit('game_created', {'room': room, 'host': hostUserName})

@socketio.on('joinRoom')
def joinRoom(data):
    print(data)
    guestUserName = data['username']
    room = data['room']

    if not guestUserName:
        send("Error: Username is required.", to=request.sid)
        return
    
    if not room:
        send("Error: Room code is required for joining a room.", to=request.sid)
        return
    if room in activeGames:
        game = activeGames[room]
        if game.gameFull:
              send("Error:Room is full.", to=request.sid)
              return

        game.joinGame(guestUserName, request.sid)
        join_room(room)
        emit('game_joined', {'room': room, 'player': guestUserName}, to=request.sid)

        print(activeGames)
        startGame({'room': room})
    else:
        emit('game_not_found', {'message': 'Game not found.'})


@socketio.on('startGame')
def startGame(data):
    roomNumber = data['room']
    if roomNumber in activeGames:
        game = activeGames[roomNumber]
        emit('game_start', {"wordBar": ['?' for _ in range(game.wordLength)], "opponentWordBar": ['?' for _ in range(game.wordLength)] }, room=roomNumber, broadcast=True)



@socketio.on('makeGuess')
def make_guess(data):
    guess = data['selectedLetter']
    room = data['roomCode']
    game = activeGames[room]

    if request.sid == game.host.connectionID:
        game.makeGuess(game.host, guess)

        data = {
                'lives': game.host.lives ,
                'wordBar': game.host.wordBar ,
                'guessedLetters': game.host.guessedLetters,
        }
        emit('guessResults', data, room=room, to=request.sid)
        emit('opponentMadeGuess', {"opponentWordBar": ['✓' if ch != '?' else '?' for ch in game.host.wordBar], 'lives':game.host.lives}, room=room, to=game.guest.connectionID )

        if game.host.lives <= 0:
            emit('endGameState', {'wonGame' : True}, room=room, to=game.guest.connectionID)
            emit('endGameState', {'wonGame' : False}, room=room, to=request.sid)

        if game.playerGuessedWord(game.host):
            emit('endGameState', {'wonGame' : True}, room=room, to=request.sid)
            emit('endGameState', {'wonGame' : False}, room=room, to=game.guest.connectionID)


    else:
        game.makeGuess(game.guest, guess)
        data = {
                'lives': game.guest.lives ,
                'wordBar': game.guest.wordBar ,
                'guessedLetters': game.guest.guessedLetters,
        }
        emit('guessResults', data, room=room, to=request.sid)
        emit('opponentMadeGuess', {"opponentWordBar": ['✓' if ch != '?' else '?' for ch in game.guest.wordBar], 'lives':game.guest.lives}, room=room, to=game.host.connectionID )

        if game.guest.lives <= 0:
            emit('endGameState', {'wonGame' : True}, room=room, to=game.host.connectionID)
            emit('endGameState', {'wonGame' : False}, room=room, to=request.sid)

        if game.playerGuessedWord(game.guest):
            emit('endGameState', {'wonGame' : True}, room=room, to=request.sid)
            emit('endGameState', {'wonGame' : False}, room=room, to=game.host.connectionID)





if __name__ == '__main__':
    socketio.run(app, host='127.0.0.1', port=5001, debug=True, ) #Replace with your server url
