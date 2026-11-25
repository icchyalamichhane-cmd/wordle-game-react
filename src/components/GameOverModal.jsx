function GameOverModal({ status, solution, onRestart }) {
  const isWon = status === "WON";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>
          {isWon ? "Congratulations!" : "Game Over!"}
        </h2>

        <p>
          {isWon
            ? "You guessed the correct word!"
            : "You used all six attempts."}
        </p>

        <p>
          The correct word is:{" "}
          <strong>{solution.toUpperCase()}</strong>
        </p>

        <button onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverModal;