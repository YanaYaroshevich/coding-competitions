const fs = require('fs');

const contents = fs.readFileSync('input2.txt', 'utf8');
const lines = contents.split('\n');

function isDigit(symbol) {
  return symbol >= '0' && symbol <= '9';
}
function lookForNumbers(lineY, lineX, length, lineLength) {
  const yStart = lineY - 1 < 0 ? 0 : lineY - 1;
  const yFinish = lineY + 2 > lineLength ? lineLength : lineY + 2;
  const numbers = [];

  const xStart = lineX - 1 < 0 ? 0 : lineX - 1;
  const xFinish = lineX + length + 1 > lineLength ? lineLength : lineX + length + 1;

  for (let i = yStart; i < yFinish; i++) {
    for (let j = xStart; j < xFinish; j++) {
      if (isDigit(lines[i][j])) {
        let numS = j;
        let numF = j;
        while (isDigit(lines[i][numS]) && numS >= 0) {
          numS--;
        }
        while (isDigit(lines[i][numF]) && numF < lineLength) {
          numF++;
        }
        numbers.push(lines[i].substring(numS + 1, numF));
        j = numF - 1;
      }
    }
  }

  return numbers.length === 2 ? numbers[0] * numbers[1] : 0;
}

let sum = 0;
lines.forEach((line, k) => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] !== '*') continue;
    sum += lookForNumbers(k, i, 1, line.length);
  }
});

console.log(sum);
