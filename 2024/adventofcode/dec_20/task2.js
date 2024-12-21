const fs = require('fs');

const matrix = fs.readFileSync('input.txt', 'utf8').split('\n');

let start;
let end;

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[i].length; j++) {
    if (matrix[i][j] === 'S') {
      start = [i, j];
    } else if (matrix[i][j] === 'E') {
      end = [i, j];
    }
  }
}

const queue = [start];
const marked = { [start[0]]: { [start[1]]: 0 } };

while (queue.length) {
  const [i, j] = queue.shift();

  if (matrix[i][j] === 'E') {
    console.log('Found the end');
    break;
  }

  const newVal = marked[i][j] + 1;

  if (i + 1 < matrix.length && marked[i + 1]?.[j] === undefined && matrix[i + 1][j] !== '#') {
    queue.push([i + 1, j]);
    marked[i + 1] = marked[i + 1] || {};
    marked[i + 1][j] = newVal;
  }
  if (j + 1 < matrix[i].length && marked[i]?.[j + 1] === undefined && matrix[i][j + 1] !== '#') {
    queue.push([i, j + 1]);
    marked[i] = marked[i] || {};
    marked[i][j + 1] = newVal;
  }
  if (i - 1 >= 0 && marked[i - 1]?.[j] === undefined && matrix[i - 1][j] !== '#') {
    queue.push([i - 1, j]);
    marked[i - 1] = marked[i - 1] || {};
    marked[i - 1][j] = newVal;
  }
  if (j - 1 >= 0 && marked[i]?.[j - 1] === undefined && matrix[i][j - 1] !== '#') {
    queue.push([i, j - 1]);
    marked[i] = marked[i] || {};
    marked[i][j - 1] = newVal;
  }
}

console.log(marked[end[0]][end[1]]);
console.log(marked);

const path = { [end[0]]: { [end[1]]: marked[end[0]][end[1]] } };

queue.push(end);

while (queue.length) {
  const [i, j] = queue.shift();

  if (matrix[i][j] === 'S') {
    console.log('Found the start');
    break;
  }

  const prevVal = marked[i][j] - 1;

  if (i + 1 < matrix.length && marked[i + 1]?.[j] === prevVal) {
    queue.push([i + 1, j]);
    path[i + 1] = path[i + 1] || {};
    path[i + 1][j] = prevVal;
    continue;
  }
  if (j + 1 < matrix[i].length && marked[i]?.[j + 1] === prevVal) {
    queue.push([i, j + 1]);
    path[i][j + 1] = prevVal;
    continue;
  }
  if (i - 1 >= 0 && marked[i - 1]?.[j] === prevVal) {
    queue.push([i - 1, j]);
    path[i - 1] = path[i - 1] || {};
    path[i - 1][j] = prevVal;
    continue;
  }
  if (j - 1 >= 0 && marked[i]?.[j - 1] === prevVal) {
    queue.push([i, j - 1]);
    path[i][j - 1] = prevVal;
  }
}

console.log(path);
const cheats = [];

for (const iStr in path) {
  for (const jStr in path[iStr]) {
    const i = +iStr;
    const j = +jStr;

    for (let i1 = -20; i1 <= 20; i1++) {
      for (let j1 = -20; j1 <= 20; j1++) {
        if (i1 === 0 && j1 === 0) {
          continue;
        }
        if (Math.abs(i1) + Math.abs(j1) > 20) {
          continue;
        }
        if (i + i1 < 0 || i + i1 >= matrix.length || j + j1 < 0 || j + j1 >= matrix[i].length) {
          continue;
        }
        if (path[i + i1]?.[j + j1] !== undefined && path[i + i1][j + j1] - path[i][j] >= Math.abs(i1) + Math.abs(j1) + 100) {
          cheats.push({ start: { i, j }, end: { i: i + i1, j: j + j1 }, val: path[i + i1][j + j1] - path[i][j] - Math.abs(i1) - Math.abs(j1) });
        }
      }
    }
  }
}

console.log(cheats.reduce((prev, cur) => {
  if (!prev[cur.val]) {
    prev[cur.val] = 0;
  }
  prev[cur.val]++;
  return prev;
}, {}));

console.log(cheats.length);
