import React, { useState } from "react";

const HangmanImage = ({hangmanStage}) => {
    
  const hangmanStages = [
    `
        +---+
        |   |
            |
            |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
            |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
        |   |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|   |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|\\  |
            |
            |
      =========`,
    `
        +---+
        |   |
        O   |
       /|\\  |
       /    |
            |
    =========`,
    `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  =========`,
  ];

  const reversedHangmanStages = [...hangmanStages].reverse();

  return (
    <>
      <pre>{reversedHangmanStages[hangmanStage]}</pre>
    </>
  );
};

export default HangmanImage;
