import React from "react";
import HangmanImage from "./HangmanImage";

const Oponentside = ({opponentWordBar, opponentHangmanStage}) => {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Opponent</h2>
         <HangmanImage hangmanStage={opponentHangmanStage}/>
          <p className="text-2xl">
            {opponentWordBar.map((char, index) => (
              <span
                key={index}
                className="inline-block border-b-2 border-black mr-2 uppercase"
              >
                {char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
};

export default Oponentside;
