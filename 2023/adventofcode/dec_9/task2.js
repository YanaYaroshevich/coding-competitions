const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

let sum = 0;
lines.forEach((line) => {
  const numbers = line.split(' ').map(Number);

  const allLines = [numbers];
  while (!allLines[allLines.length - 1].every((n) => n === 0)) {
    const newLine = [];
    const lastLine = allLines[allLines.length - 1];
    for (let i = 0; i < lastLine.length - 1; i++) {
      newLine.push(lastLine[i + 1] - lastLine[i]);
    }
    allLines.push(newLine);
  }

  allLines[allLines.length - 1].unshift(0);

  for (let j = allLines.length - 1; j > 0; j--) {
    allLines[j - 1].unshift(allLines[j - 1][0] - allLines[j][0]);
  }

  sum += allLines[0][0];
});

console.log(sum);
