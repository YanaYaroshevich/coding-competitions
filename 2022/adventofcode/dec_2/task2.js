/*
 *--- Part Two ---
 * The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!"
 *
 * The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:
 *
 * In the first round, your opponent will choose Rock (A), and you need the round to end in a draw (Y), so you also choose Rock. This gives you a score of 1 + 3 = 4.
 * In the second round, your opponent will choose Paper (B), and you choose Rock so you lose (X) with a score of 1 + 0 = 1.
 * In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = 7.
 * Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of 12.
 *
 * Following the Elf's instructions for the second column, what would your total score be if everything goes exactly according to your strategy guide?
 *
 * Your puzzle answer was 11618.
 * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const map = {
  A: 1, // Rock
  B: 2, // Paper
  C: 3, // Scissors
};

const winMap = {
  X: 0, // Loose
  Y: 3, // DRAW
  Z: 6, // WIN
};

const myPoints = lines.reduce((acc, line) => {
  const move = line.split(" ");
  let myPoints = winMap[move[1]];

  if (move[1] === "Y") {
    myPoints += map[move[0]];
  } else if (move[1] === "Z") {
    myPoints += map[move[0]] === 3 ? 1 : map[move[0]] + 1;
  } else {
    myPoints += map[move[0]] === 1 ? 3 : map[move[0]] - 1;
  }

  return acc + myPoints;
}, 0);

console.log(myPoints);
