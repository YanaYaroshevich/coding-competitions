const fs = require('fs');

const map = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(''));

let start;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 'S') {
      start = [i, j];
      break;
    }
  }
}

console.log(start);
let threads = {
  [start[1]]: true,
};

let k = 1;
let count = 0;

while (k < map.length) {
  const newThreads = {};
  for (let j in threads) {
    j = +j;
    if (map[k][j] === '.') {
      newThreads[j] = true;
      continue;
    }
    if (map[k][j] === '^') {
      if (j - 1 >= 0) {
        newThreads[j - 1] = true;
      }
      if (j + 1 < map[k].length) {
        newThreads[j + 1] = true;
      }
      count++;
    }
  }
  threads = newThreads;
  k++;
}

console.log(threads);
console.log(count);
