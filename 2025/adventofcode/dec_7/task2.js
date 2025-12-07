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
  [start[1]]: 1,
};

let k = 1;

while (k < map.length) {
  const newThreads = {};
  for (let j in threads) {
    j = +j;
    if (map[k][j] === '.') {
      newThreads[j] = newThreads[j] ? newThreads[j] + threads[j] : threads[j];
      continue;
    }
    if (map[k][j] === '^') {
      if (j - 1 >= 0) {
        newThreads[j - 1] = newThreads[j - 1] ? newThreads[j - 1] + threads[j] : threads[j];
      }
      if (j + 1 < map[k].length) {
        newThreads[j + 1] = newThreads[j + 1] ? newThreads[j + 1] + threads[j] : threads[j];
      }
    }
  }
  threads = newThreads;
  k++;
}

console.log(threads);
console.log(Object.values(threads).reduce((a, b) => a + b, 0));
