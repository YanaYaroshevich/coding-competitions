const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const numbersArr = [];

function isDigit(symbol) {
  return symbol >= '0' && symbol <= '9';
}
function lookForSymbol(lineY, lineX, length, lineLength) {
  const yStart = lineY - 1 < 0 ? 0 : lineY - 1;
  const yFinish = lineY + 2 > lineLength ? lineLength : lineY + 2;

  const xStart = lineX - 1 < 0 ? 0 : lineX - 1;
  const xFinish = lineX + length + 1 > lineLength ? lineLength : lineX + length + 1;

  for (let i = yStart; i < yFinish; i++) {
    for (let j = xStart; j < xFinish; j++) {
      if (lines[i][j] !== '.' && !isDigit(lines[i][j])) {
        return true;
      }
    }
  }
  return false;
}

lines.forEach((line, k) => {
  for (let i = 0; i < line.length; i++) {
    if (!isDigit(line[i])) continue;
    let num = line[i];
    let j = i + 1;
    while (isDigit(line[j]) && j < line.length) {
      num += line[j];
      j++;
    }
    console.log(num);
    const flag = lookForSymbol(k, i, num.length, line.length);
    if (flag) {
      numbersArr.push(+num);
    }
    i = j;
  }
});

const sum = numbersArr.reduce((prev, cur) => prev + cur, 0);
console.log(sum);
