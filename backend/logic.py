from random import randint


class Game:
    def __init__(self, room, hostUserName, connectionID):
        self.room = room
        
        self.word = self.selectWord()
        self.wordLength = len(self.word)

        self.host = Player(hostUserName, self.wordLength, connectionID)
        self.guest = None

        self.gameFull = False


        #print(self.word)

    def joinGame(self, guestUserName, connectionID):
        self.guest = Player(guestUserName, self.wordLength, connectionID)
        self.gameFull = True


    def selectWord(self):
        fileLocation = 'backend/wordList.txt'
        numWords = sum(1 for _ in open(fileLocation))
        lineNumberOfWord = randint(1, numWords)
        with open(fileLocation) as f:
            lines = f.read().splitlines()
        return lines[lineNumberOfWord]

    def makeGuess(self, player, guess):
        if guess in self.word:
            temp = player.wordBar
            for i, letter in enumerate(self.word,0):
                if letter == guess:
                    temp[i] = guess
            player.wordBar = temp
  
        else:
            player.lives -= 1
        player.guessedLetters.append(guess)
    
    def playerGuessedWord(self, player):
        return ''.join(player.wordBar) == self.word
    




class Player:
    def __init__(self, userName, wordLength, connectionID):
        self.userName = userName
        self.lives = 6
        self.wordBar = ['?' for _ in range(wordLength)]
        self.guessedLetters = []
        self.connectionID = connectionID
        self.playerGuessedWord = False





