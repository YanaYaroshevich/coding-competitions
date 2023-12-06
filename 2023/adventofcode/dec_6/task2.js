const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const time = +lines[0].match(/\d+/g).reduce((prev, cur) => prev + cur, '');
const distance = +lines[1].match(/\d+/g).reduce((prev, cur) => prev + cur, '');

let winsCount = 0;

for (let t = 1; t < time; t++) {
  if (t * (time - t) > distance) {
    winsCount++;
  }
}

console.log(winsCount);
