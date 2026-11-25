export function checkGuess(guess, solutionWord) {
  const result = Array.from(guess, (letter) => ({
    letter,
    status: "absent"
  }));

  const letterCounts = {};

  // Count letters in the solution word
  for (const letter of solutionWord) {
    letterCounts[letter] =
      (letterCounts[letter] || 0) + 1;
  }

  // First check correct letters
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solutionWord[i]) {
      result[i].status = "correct";
      letterCounts[guess[i]]--;
    }
  }

  // Then check letters in different positions
  for (let i = 0; i < 5; i++) {
    if (result[i].status === "correct") continue;

    const letter = guess[i];

    if (letterCounts[letter] > 0) {
      result[i].status = "present";
      letterCounts[letter]--;
    }
  }

  return result;
}