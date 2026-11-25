import Tile from "./Tile";

function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row">
        {guess.result.map((item, index) => (
          <Tile
            key={index}
            letter={item.letter}
            status={item.status}
          />
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split("");

    return (
      <div className="row">
        {Array.from({ length: 5 }, (_, index) => (
          <Tile
            key={index}
            letter={letters[index] || ""}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile key={index} letter="" />
      ))}
    </div>
  );
}

export default Row;