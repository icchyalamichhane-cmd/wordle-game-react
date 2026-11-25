import Row from "./Row";

function GameBoard({ pastGuesses, currentGuess }) {
  return (
    <div className="game-board">
      {Array.from({ length: 6 }, (_, index) => (
        <Row
          key={index}
          guess={pastGuesses[index]}
          currentGuess={
            index === pastGuesses.length ? currentGuess : null
          }
        />
      ))}
    </div>
  );
}

export default GameBoard;