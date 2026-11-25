const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({ onKeyPress, usedKeys }) {
  return (
    <div className="keyboard">
      {keyboardRows.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map((key) => (
            <button
              key={key}
              type="button"
              className={`key ${
                usedKeys[key.toLowerCase()] || ""
              } ${
                key === "ENTER" || key === "BACKSPACE"
                  ? "large-key"
                  : ""
              }`}
              onClick={() => onKeyPress(key)}
            >
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;