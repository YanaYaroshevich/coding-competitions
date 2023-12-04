const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

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
  const move = line.split(' ');
  let myPoints = winMap[move[1]];

  if (move[1] === 'Y') {
    myPoints += map[move[0]];
  } else if (move[1] === 'Z') {
    myPoints += map[move[0]] === 3 ? 1 : map[move[0]] + 1;
  } else {
    myPoints += map[move[0]] === 1 ? 3 : map[move[0]] - 1;
  }

  return acc + myPoints;
}, 0);

console.log(myPoints);
