import React, { useState } from "react";
import Keyboard from "./Keyboard";
import HangmanImage from "./HangmanImage";
import { useSocket } from "../SocketProvider";

const PlayerSide = ({guessedLetters, wordBar, userHangmanStage, roomCode}) => {
  const [selectedLetter, setSelectedLetter] = useState("q");

  const socket = useSocket();

  const makeGuess = () => {
    //make a websocket call with the letter pressed
    socket.emit("makeGuess", { selectedLetter: selectedLetter, roomCode: roomCode });
  };





  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">You</h2>
         <HangmanImage hangmanStage={userHangmanStage}/>
          <p className="text-2xl">
            {wordBar.map((char, index) => (
              <span
                key={index}
                className="inline-block border-b-2 border-black mr-2 uppercase"
              >
                {char}
              </span>
            ))}
          </p>

          <div>
            <button className="btn join-item btn-accent" onClick={makeGuess}>
              Make guess
            </button>
          </div>
          <Keyboard
            selectedLetter={selectedLetter}
            setSelectedLetter={setSelectedLetter}
            guessedLetters={guessedLetters}
          />
        </div>
      </div>
    </>
  );
};

export default PlayerSide;
