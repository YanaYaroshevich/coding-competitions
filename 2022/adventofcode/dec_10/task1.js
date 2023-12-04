const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const neededMoves = [20, 60, 100, 140, 180, 220];

let x = 1;
let i = 0;
let powerSum = 0;
let line;

while (true) {
  if (!lines.length) {
    break;
  }

  if (neededMoves.includes(i + 1)) {
    powerSum += (i + 1) * x;
  }

  if (!line) {
    line = lines.shift();
  }

  if (line === 'noop') {
    i += 1;
    line = null;
    continue;
  }

  if (line !== 'noop') {
    const [, num] = line.split(' ');
    i++;
    if (neededMoves.includes(i + 1)) {
      powerSum += (i + 1) * x;
    }
    i++;
    x += Number(num);
    line = null;
  }
}

console.log(powerSum);
