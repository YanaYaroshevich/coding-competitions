const fs = require('fs');

const matr = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(''));

let c;
let finish;

for (let i = 0; i < matr.length; i++) {
  for (let j = 0; j < matr[i].length; j++) {
    if (matr[i][j] === 'S') {
      c = { i, j };
    }
    if (matr[i][j] === 'E') {
      finish = { i, j };
    }
  }
}

function mark(next, visited) {
  const { acc } = next;
  if (!visited[next.i]) {
    visited[next.i] = {};
  }

  visited[next.i][next.j] = visited[next.i][next.j] === undefined || visited[next.i][next.j] > acc ? acc : visited[next.i][next.j];
}

function getAccumulator(visited, next, dir) {
  let acc = visited[next.i][next.j] + 1;

  if (dir === 'down') {
    if (next.dir === 'right' || next.dir === 'left') {
      acc = visited[next.i][next.j] + 1000 + 1;
    }
    if (next.dir === 'up') {
      acc = visited[next.i][next.j] + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'up') {
    if (next.dir === 'right' || next.dir === 'left') {
      acc = visited[next.i][next.j] + 1000 + 1;
    }
    if (next.dir === 'down') {
      acc = visited[next.i][next.j] + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'right') {
    if (next.dir === 'up' || next.dir === 'down') {
      acc = visited[next.i][next.j] + 1000 + 1;
    }
    if (next.dir === 'left') {
      acc = visited[next.i][next.j] + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'left') {
    if (next.dir === 'up' || next.dir === 'down') {
      acc = visited[next.i][next.j] + 1000 + 1;
    }
    if (next.dir === 'right') {
      acc = visited[next.i][next.j] + 2000 + 1;
    }
  }
  return acc;
}

const stack = [{ ...c, acc: 0, dir: 'right' }];
const visited = { [c.i]: { [c.j]: 0 } };

while (stack.length) {
  const next = stack.pop();
  mark(next, visited);

  const downAcc = getAccumulator(visited, next, 'down');
  const upAcc = getAccumulator(visited, next, 'up');
  const rightAcc = getAccumulator(visited, next, 'right');
  const leftAcc = getAccumulator(visited, next, 'left');

  if (next.i + 1 < matr.length && matr[next.i + 1][next.j] !== '#' && (visited[next.i + 1]?.[next.j] === undefined || visited[next.i + 1]?.[next.j] > downAcc)) {
    stack.push({
      i: next.i + 1, j: next.j, acc: downAcc, dir: 'down',
    });
  }
  if (next.i - 1 >= 0 && matr[next.i - 1][next.j] !== '#' && (visited[next.i - 1]?.[next.j] === undefined || visited[next.i - 1]?.[next.j] > upAcc)) {
    stack.push({
      i: next.i - 1, j: next.j, acc: upAcc, dir: 'up',
    });
  }
  if (next.j + 1 < matr[next.i].length && matr[next.i][next.j + 1] !== '#' && (visited[next.i]?.[next.j + 1] === undefined || visited[next.i]?.[next.j + 1] > rightAcc)) {
    stack.push({
      i: next.i, j: next.j + 1, acc: rightAcc, dir: 'right',
    });
  }
  if (next.j - 1 >= 0 && matr[next.i][next.j - 1] !== '#' && (visited[next.i]?.[next.j - 1] === undefined || visited[next.i]?.[next.j - 1] > leftAcc)) {
    stack.push({
      i: next.i, j: next.j - 1, acc: leftAcc, dir: 'left',
    });
  }
}

console.log(visited[finish.i][finish.j]);
