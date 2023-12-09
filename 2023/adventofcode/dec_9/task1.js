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

  allLines[allLines.length - 1].push(0);

  for (let j = allLines.length - 1; j > 0; j--) {
    allLines[j - 1].push(allLines[j][allLines[j].length - 1] + allLines[j - 1][allLines[j - 1].length - 1]);
  }

  sum += allLines[0][allLines[0].length - 1];
});

console.log(sum);
