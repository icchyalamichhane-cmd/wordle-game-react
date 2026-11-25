import { useState, useCallback } from "react";
import { getRandomWord } from "../data/words";
import { checkGuess } from "../utils/checkGuess";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const priority = {
  absent: 1,
  present: 2,
  correct: 3
};

function useWordle() {
  // Main game states
  const [solutionWord, setSolutionWord] = useState(
    () => getRandomWord()
  );

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState(
    "IN_PROGRESS"
  );

  const [usedKeys, setUsedKeys] = useState({});

  // Handle physical and virtual keyboard input
  const handleKeyup = useCallback((key) => {
    if (gameStatus !== "IN_PROGRESS") return;

    // Delete the last letter
    if (key === "Backspace" || key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    // Submit the guess
    if (key === "Enter" || key === "ENTER") {
      if (currentGuess.length !== WORD_LENGTH) return;

      const result = checkGuess(
        currentGuess,
        solutionWord
      );

      const newGuess = {
        word: currentGuess,
        result
      };

      const updatedGuesses = [
        ...pastGuesses,
        newGuess
      ];

      setPastGuesses(updatedGuesses);

      // Update virtual keyboard colors
      setUsedKeys((prev) => {
        const updated = { ...prev };

        result.forEach(({ letter, status }) => {
          const oldStatus = updated[letter] || "";

          if (
            priority[status] >
            (priority[oldStatus] || 0)
          ) {
            updated[letter] = status;
          }
        });

        return updated;
      });

      // Check winning condition
      if (currentGuess === solutionWord) {
        setGameStatus("WON");
      }

      // Check losing condition
      else if (updatedGuesses.length === MAX_ATTEMPTS) {
        setGameStatus("LOST");
      }

      setCurrentGuess("");
      return;
    }

    // Accept only alphabetical characters
    if (/^[a-zA-Z]$/.test(key)) {
      setCurrentGuess((prev) => {
        if (prev.length >= WORD_LENGTH) return prev;

        return prev + key.toLowerCase();
      });
    }
  }, [
    gameStatus,
    currentGuess,
    solutionWord,
    pastGuesses
  ]);

  // Reset all states for a new game
  const resetGame = useCallback(() => {
    let newWord = getRandomWord();

    while (newWord === solutionWord) {
      newWord = getRandomWord();
    }

    setSolutionWord(newWord);
    setCurrentGuess("");
    setPastGuesses([]);
    setUsedKeys({});
    setGameStatus("IN_PROGRESS");
  }, [solutionWord]);

  return {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    usedKeys,
    handleKeyup,
    resetGame
  };
}

export default useWordle;