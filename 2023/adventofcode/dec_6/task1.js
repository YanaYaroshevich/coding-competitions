const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const times = lines[0].match(/\d+/g).map(Number);
const distances = lines[1].match(/\d+/g).map(Number);

const winsCount = Array(times.length).fill(0);

for (let i = 0; i < times.length; i++) {
  for (let t = 1; t < times[i]; t++) {
    if (t * (times[i] - t) > distances[i]) {
      winsCount[i]++;
    }
  }
}

console.log(winsCount);
console.log(winsCount.reduce((prev, cur) => prev * cur, 1));
