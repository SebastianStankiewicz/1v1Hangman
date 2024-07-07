import React, { useState } from "react";

const Keyboard = ({selectedLetter, setSelectedLetter, guessedLetters, setGuessedLetters}) => {
  

  const handleButtonClick = (letter) => {
    setSelectedLetter(letter);
  };

  const buttonClass = (letter) =>
  `kbd ${guessedLetters.includes(letter) ? "btn-disabled bg-error" : ""} hover:bg-accent ${selectedLetter === letter ? "bg-secondary" : ""}`;

  return (
    <>
      <div className="my-1 flex w-full justify-center gap-1">
        <kbd
          className={buttonClass("q")}
          onClick={() => handleButtonClick("q")}
        >
          q
        </kbd>
        <kbd
          className={buttonClass("w")}
          onClick={() => handleButtonClick("w")}
        >
          w
        </kbd>
        <kbd
          className={buttonClass("e")}
          onClick={() => handleButtonClick("e")}
        >
          e
        </kbd>
        <kbd
          className={buttonClass("r")}
          onClick={() => handleButtonClick("r")}
        >
          r
        </kbd>
        <kbd
          className={buttonClass("t")}
          onClick={() => handleButtonClick("t")}
        >
          t
        </kbd>
        <kbd
          className={buttonClass("y")}
          onClick={() => handleButtonClick("y")}
        >
          y
        </kbd>
        <kbd
          className={buttonClass("u")}
          onClick={() => handleButtonClick("u")}
        >
          u
        </kbd>
        <kbd
          className={buttonClass("i")}
          onClick={() => handleButtonClick("i")}
        >
          i
        </kbd>
        <kbd
          className={buttonClass("o")}
          onClick={() => handleButtonClick("o")}
        >
          o
        </kbd>
        <kbd
          className={buttonClass("p")}
          onClick={() => handleButtonClick("p")}
        >
          p
        </kbd>
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <kbd
          className={buttonClass("a")}
          onClick={() => handleButtonClick("a")}
        >
          a
        </kbd>
        <kbd
          className={buttonClass("s")}
          onClick={() => handleButtonClick("s")}
        >
          s
        </kbd>
        <kbd
          className={buttonClass("d")}
          onClick={() => handleButtonClick("d")}
        >
          d
        </kbd>
        <kbd
          className={buttonClass("f")}
          onClick={() => handleButtonClick("f")}
        >
          f
        </kbd>
        <kbd
          className={buttonClass("g")}
          onClick={() => handleButtonClick("g")}
        >
          g
        </kbd>
        <kbd
          className={buttonClass("h")}
          onClick={() => handleButtonClick("h")}
        >
          h
        </kbd>
        <kbd
          className={buttonClass("j")}
          onClick={() => handleButtonClick("j")}
        >
          j
        </kbd>
        <kbd
          className={buttonClass("k")}
          onClick={() => handleButtonClick("k")}
        >
          k
        </kbd>
        <kbd
          className={buttonClass("l")}
          onClick={() => handleButtonClick("l")}
        >
          l
        </kbd>
      </div>
      <div className="my-1 flex w-full justify-center gap-1">
        <kbd
          className={buttonClass("z")}
          onClick={() => handleButtonClick("z")}
        >
          z
        </kbd>
        <kbd
          className={buttonClass("x")}
          onClick={() => handleButtonClick("x")}
        >
          x
        </kbd>
        <kbd
          className={buttonClass("c")}
          onClick={() => handleButtonClick("c")}
        >
          c
        </kbd>
        <kbd
          className={buttonClass("v")}
          onClick={() => handleButtonClick("v")}
        >
          v
        </kbd>
        <kbd
          className={buttonClass("b")}
          onClick={() => handleButtonClick("b")}
        >
          b
        </kbd>
        <kbd
          className={buttonClass("n")}
          onClick={() => handleButtonClick("n")}
        >
          n
        </kbd>
        <kbd
          className={buttonClass("m")}
          onClick={() => handleButtonClick("m")}
        >
          m
        </kbd>
      </div>
    </>
  );
};

export default Keyboard;
