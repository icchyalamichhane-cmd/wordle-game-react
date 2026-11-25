import { useEffect } from "react";
import useWordle from "./hooks/useWordle";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import GameOverModal from "./components/GameOverModal";
import "./App.css";

function App() {
  const {
    solutionWord,
    currentGuess,
    pastGuesses,
    gameStatus,
    usedKeys,
    handleKeyup,
    resetGame
  } = useWordle();

  // Handle physical keyboard input
  useEffect(() => {
    if (gameStatus !== "IN_PROGRESS") return;

    const handleKeyDown = (event) => {
      if (
        event.key === "Backspace" ||
        event.key === "Enter"
      ) {
        event.preventDefault();
      }

      handleKeyup(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyup, gameStatus]);

  return (
    <div className="app">
      <header className="header">
        <h1>WORDLE</h1>
        <p>Guess the hidden five-letter word!</p>
      </header>

      <GameBoard
        pastGuesses={pastGuesses}
        currentGuess={currentGuess}
      />

      <Keyboard
        onKeyPress={handleKeyup}
        usedKeys={usedKeys}
      />

      {gameStatus !== "IN_PROGRESS" && (
        <GameOverModal
          status={gameStatus}
          solution={solutionWord}
          onRestart={resetGame}
        />
      )}
    </div>
  );
}

export default App;