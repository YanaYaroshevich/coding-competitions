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
    if (j - 2 >= 0 && path[i]?.[j - 2] !== undefined && path[i][j - 2] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i, j: j - 2 }, val: path[i][j - 2] - path[i][j] - 2 });
    }
    if (j + 2 < matrix[i].length && path[i]?.[j + 2] !== undefined && path[i][j + 2] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i, j: j + 2 }, val: path[i][j + 2] - path[i][j] - 2 });
    }
    if (i - 2 >= 0 && path[i - 2]?.[j] !== undefined && path[i - 2][j] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i - 2, j }, val: path[i - 2][j] - path[i][j] - 2 });
    }
    if (i + 2 < matrix.length && path[i + 2]?.[j] !== undefined && path[i + 2][j] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i + 2, j }, val: path[i + 2][j] - path[i][j] - 2 });
    }
    if (i + 1 < matrix.length && path[i + 1]?.[j + 1] !== undefined && j + 1 < matrix[i].length && path[i + 1][j + 1] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i + 1, j: j + 1 }, val: path[i + 1][j + 1] - path[i][j] - 2 });
    }
    if (i + 1 < matrix.length && path[i + 1]?.[j - 1] !== undefined && j - 1 >= 0 && path[i + 1][j - 1] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i + 1, j: j - 1 }, val: path[i + 1][j - 1] - path[i][j] - 2 });
    }
    if (i - 1 >= 0 && j + 1 < matrix[i].length && path[i - 1]?.[j + 1] !== undefined && path[i - 1][j + 1] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i - 1, j: j + 1 }, val: path[i - 1][j + 1] - path[i][j] - 2 });
    }
    if (i - 1 >= 0 && j - 1 >= 0 && path[i - 1]?.[j - 1] !== undefined && path[i - 1][j - 1] - path[i][j] >= 102) {
      cheats.push({ start: { i, j }, end: { i: i - 1, j: j - 1 }, val: path[i - 1][j - 1] - path[i][j] - 2 });
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
