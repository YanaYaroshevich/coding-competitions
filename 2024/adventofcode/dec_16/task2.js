const fs = require('fs');

const matr = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(''));

let start;
let finish;
for (let i = 0; i < matr.length; i++) {
  for (let j = 0; j < matr[i].length; j++) {
    if (matr[i][j] === 'S') {
      start = { i, j };
    }
    if (matr[i][j] === 'E') {
      finish = { i, j };
    }
  }
}

const answer = 106512;

function mark(next, visited) {
  const { acc } = next;
  if (!visited[next.i]) {
    visited[next.i] = {};
  }
  if (!visited[next.i][next.j]) {
    visited[next.i][next.j] = {};
  }

  if (visited[next.i][next.j][next.dir] === undefined || visited[next.i][next.j][next.dir] > acc) {
    visited[next.i][next.j][next.dir] = acc;
  }
}
function getAccumulator(curAcc, next, dir) {
  let acc = curAcc + 1;

  if (dir === 'down') {
    if (next.dir === 'right' || next.dir === 'left') {
      acc = curAcc + 1000 + 1;
    }
    if (next.dir === 'up') {
      acc = curAcc + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'up') {
    if (next.dir === 'right' || next.dir === 'left') {
      acc = curAcc + 1000 + 1;
    }
    if (next.dir === 'down') {
      acc = curAcc + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'right') {
    if (next.dir === 'up' || next.dir === 'down') {
      acc = curAcc + 1000 + 1;
    }
    if (next.dir === 'left') {
      acc = curAcc + 2000 + 1;
    }
    return acc;
  }

  if (dir === 'left') {
    if (next.dir === 'up' || next.dir === 'down') {
      acc = curAcc + 1000 + 1;
    }
    if (next.dir === 'right') {
      acc = curAcc + 2000 + 1;
    }
  }
  return acc;
}

const stack = [{ ...start, acc: 0, dir: 'right' }];
const visited = { [start.i]: { [start.j]: { right: 0 } } };

while (stack.length) {
  const next = stack.pop();
  console.log(next.acc);
  mark(next, visited);

  const downAcc = getAccumulator(next.acc, next, 'down');
  const upAcc = getAccumulator(next.acc, next, 'up');
  const rightAcc = getAccumulator(next.acc, next, 'right');
  const leftAcc = getAccumulator(next.acc, next, 'left');

  if (next.i + 1 < matr.length && matr[next.i + 1][next.j] !== '#' && downAcc <= answer && (visited[next.i + 1]?.[next.j]?.down === undefined || visited[next.i + 1]?.[next.j]?.down > downAcc)) {
    stack.push({
      i: next.i + 1, j: next.j, acc: downAcc, dir: 'down',
    });
  }
  if (next.i - 1 >= 0 && matr[next.i - 1][next.j] !== '#' && upAcc <= answer && (visited[next.i - 1]?.[next.j]?.up === undefined || visited[next.i - 1]?.[next.j]?.up > upAcc)) {
    stack.push({
      i: next.i - 1, j: next.j, acc: upAcc, dir: 'up',
    });
  }
  if (next.j + 1 < matr[next.i].length && matr[next.i][next.j + 1] !== '#' && rightAcc <= answer && (visited[next.i]?.[next.j + 1]?.right === undefined || visited[next.i]?.[next.j + 1]?.right > rightAcc)) {
    stack.push({
      i: next.i, j: next.j + 1, acc: rightAcc, dir: 'right',
    });
  }
  if (next.j - 1 >= 0 && matr[next.i][next.j - 1] !== '#' && leftAcc <= answer && (visited[next.i]?.[next.j - 1]?.left === undefined || visited[next.i]?.[next.j - 1]?.left > leftAcc)) {
    stack.push({
      i: next.i, j: next.j - 1, acc: leftAcc, dir: 'left',
    });
  }
}

console.log(visited[finish.i][finish.j]);
console.log(visited);

stack.push(...Object.keys(visited[finish.i][finish.j]).filter((dir) => visited[finish.i][finish.j][dir] === answer).map((dir) => ({
  i: finish.i, j: finish.j, acc: visited[finish.i][finish.j][dir], dir,
})));

const mapPath = { [finish.i]: { [finish.j]: true } };

while (stack.length) {
  const next = stack.pop();
  mapPath[next.i] = mapPath[next.i] || {};
  mapPath[next.i][next.j] = true;

  switch (next.dir) {
    case 'down': {
      const prevI = next.i - 1;
      const prevJ = next.j;

      if (visited[prevI][prevJ]?.down === next.acc - 1) {
        stack.push({
          i: prevI, j: prevJ, dir: 'down', acc: next.acc - 1,
        });
      }
      if (visited[prevI][prevJ]?.right === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'right', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.left === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'left', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.up === next.acc - 2001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'up', acc: next.acc - 2001,
        });
      }
      break;
    }
    case 'up': {
      const prevI = next.i + 1;
      const prevJ = next.j;

      if (visited[prevI][prevJ]?.down === next.acc - 2001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'down', acc: next.acc - 2001,
        });
      }
      if (visited[prevI][prevJ]?.right === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'right', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.left === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'left', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.up === next.acc - 1) {
        stack.push({
          i: prevI, j: prevJ, dir: 'up', acc: next.acc - 1,
        });
      }
      break;
    }
    case 'right': {
      const prevI = next.i;
      const prevJ = next.j - 1;

      if (visited[prevI][prevJ]?.down === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'down', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.right === next.acc - 1) {
        stack.push({
          i: prevI, j: prevJ, dir: 'right', acc: next.acc - 1,
        });
      }
      if (visited[prevI][prevJ]?.left === next.acc - 2001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'left', acc: next.acc - 2001,
        });
      }
      if (visited[prevI][prevJ]?.up === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'up', acc: next.acc - 1001,
        });
      }
      break;
    }
    case 'left': {
      const prevI = next.i;
      const prevJ = next.j + 1;

      if (visited[prevI][prevJ]?.down === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'down', acc: next.acc - 1001,
        });
      }
      if (visited[prevI][prevJ]?.right === next.acc - 2001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'right', acc: next.acc - 2001,
        });
      }
      if (visited[prevI][prevJ]?.left === next.acc - 1) {
        stack.push({
          i: prevI, j: prevJ, dir: 'left', acc: next.acc - 1,
        });
      }
      if (visited[prevI][prevJ]?.up === next.acc - 1001) {
        stack.push({
          i: prevI, j: prevJ, dir: 'up', acc: next.acc - 1001,
        });
      }
      break;
    }
    default:
      break;
  }
}

console.log(mapPath);
console.log(Object.keys(mapPath).reduce((acc, i) => acc + Object.keys(mapPath[i]).length, 0));
