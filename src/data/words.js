export const WORDS = [
  "apple",
  "brave",
  "crane",
  "dance",
  "email",
  "eagle",
  "flame",
  "fight",
  "house",
  "lemon",
  "light",
  "mango",
  "ocean",
  "peace",
  "queen",
  "river",
  "smile",
  "table",
  "tiger",
  "water"
];

export function getRandomWord() {
  const index = Math.floor(
    Math.random() * WORDS.length
  );

  return WORDS[index];
}