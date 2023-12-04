const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const maxArr = [];
let count = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].length > 0 && !Number.isNaN(lines[i])) {
    maxArr[count] = +maxArr[count] ? +maxArr[count] + +lines[i] : +lines[i];
  } else {
    count++;
  }
}

maxArr.sort((a, b) => b - a);

console.log(maxArr[0] + maxArr[1] + maxArr[2]);
