import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import PlayerSide from "./PlayerSide";
import OponentSide from "./OponentSide";
import { useSocket } from "../SocketProvider";

const Game = ({ roomCode }) => {
  //Because player can host a game and needs to wait for someone to join there room
  const [bothPlayersInRoom, setBothPlayersInRoom] = useState(false);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wordBar, setWordBar] = useState([]);
  const [opponentWordBar, setOpponentWordBar] = useState([]);
  const [userHangmanStage, setUserHangmanStage] = useState(6);
  const [opponentHangmanStage, setOpponentHangmanStage] = useState(6);
  const [modalText, setModalText] = useState();

  const socket = useSocket();

  useEffect(() => {
    const handleGameStart = (data) => {
      setBothPlayersInRoom(true); 
      setWordBar(data.wordBar);
      setOpponentWordBar(data.wordBar);
    };

    const handleGuessResults = (data) => {
      setWordBar(data.wordBar);
      setGuessedLetters(data.guessedLetters);
      setUserHangmanStage(data.lives)
    };

    const handleEndGameState = (data) => {
      if (data.wonGame) {
        setModalText("🎉You won!!!🎉")
        document.getElementById('endGameModal').showModal()
      } else {
        setModalText("😭You lost😭")
        document.getElementById('endGameModal').showModal()
        
      }
    };

    const handleOpponentMadeGuess = (data) => {
      setOpponentWordBar(data.opponentWordBar);
      setOpponentHangmanStage(data.lives)
    };

    if (socket) {
      socket.on("guessResults", handleGuessResults);
      socket.on("opponentMadeGuess", handleOpponentMadeGuess);
      socket.on("game_start", handleGameStart);
      socket.on("endGameState", handleEndGameState);

      return () => {
        socket.off("game_start");
      };
    }
  }, [socket]);

  return (
    <>
      {bothPlayersInRoom ? (
        <div className="flex w-full h-full flex-col lg:flex-row items-center justify-center bg-base-200 min-h-screen">
          <PlayerSide
            guessedLetters={guessedLetters}
            wordBar={wordBar}
            userHangmanStage={userHangmanStage}
            roomCode={roomCode}
          />
          <div className="divider lg:divider-horizontal">VS</div>
          <OponentSide
            opponentWordBar={opponentWordBar}
            opponentHangmanStage={opponentHangmanStage}
          />

          <dialog id="endGameModal" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Game Over!</h3>
              <p className="py-4 text-5xl">{modalText}</p>
              <p className="py-4">Reload the page to go back to the menu</p>
            </div>

          </dialog>
        </div>

      ) : (
        <>
          <h1 className="text-5xl font-bold">Room code: {roomCode}</h1>
          <p>Waiting for opponent to join</p>
          <span className="loading loading-dots loading-lg"></span>
        </>
      )}
    </>
  );
};

export default Game;
