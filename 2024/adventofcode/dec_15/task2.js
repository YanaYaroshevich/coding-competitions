const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const oldMap = contents[0].split('\n').map((line) => line.split(''));
const robot = '@';
let position;

const map = [];

for (let i = 0; i < oldMap.length; i++) {
  map.push([]);
  for (let j = 0; j < oldMap[i].length; j++) {
    if (oldMap[i][j] === '#') {
      map[i].push('#');
      map[i].push('#');
    }
    if (oldMap[i][j] === '.') {
      map[i].push('.');
      map[i].push('.');
    }
    if (oldMap[i][j] === 'O') {
      map[i].push('[');
      map[i].push(']');
    }
    if (oldMap[i][j] === robot) {
      map[i].push(robot);
      map[i].push('.');
      position = { i, j: map[i].lastIndexOf(robot) };
    }
  }
}

console.log(position);
console.log(map.map((el) => el.join('')));

const moves = contents[1].split('\n').join('').split('');

let boxes = {};

function hasSpace(iL, jL, iDiff, jDiff) {
  if (boxes[iL]?.[jL]) {
    return true;
  }

  if (!boxes[iL]) {
    boxes[iL] = {};
  }

  boxes[iL][jL] = true;

  if (iDiff === 1 || iDiff === -1) {
    for (let k = iL + iDiff; iDiff === 1 ? k < map.length : k >= 0; k += iDiff) {
      if (map[k][jL] === '#' || map[k][jL + 1] === '#') {
        return false;
      }

      if (map[k][jL] === '.' && map[k][jL + 1] === '.') {
        return true;
      }

      if (map[k][jL] === '[') {
        return hasSpace(k, jL, iDiff, jDiff);
      }
      if (map[k][jL + 1] === '[') {
        if (map[k][jL] === ']') {
          return hasSpace(k, jL + 1, iDiff, jDiff) && hasSpace(k, jL - 1, iDiff, jDiff);
        }
        return hasSpace(k, jL + 1, iDiff, jDiff);
      }
      if (map[k][jL] === ']') {
        return hasSpace(k, jL - 1, iDiff, jDiff);
      }
    }
    return false;
  }

  for (let l = jL + jDiff; jDiff === 1 ? l < map[iL].length : l >= 0; l += jDiff) {
    if (map[iL][l] === '#') {
      return false;
    }

    if (map[iL][l] === '.') {
      return true;
    }

    if (map[iL][l] === '[') {
      boxes[iL][l] = true;
    }
  }
  return false;
}

function attemptToMove(iS, jS, iDiff, jDiff) {
  const i = iS + iDiff;
  const j = jS + jDiff;
  boxes = {};

  if (map[i][j] === '#') {
    return;
  }

  if (map[i][j] === '[' && !hasSpace(i, j, iDiff, jDiff)) {
    return;
  }
  if (map[i][j] === ']' && !hasSpace(i, j - 1, iDiff, jDiff)) {
    return;
  }

  const boxesArr = Object.keys(boxes).reduce((prev, cur) => {
    const j = Object.keys(boxes[cur]);
    for (const jBox of j) {
      prev.push([+cur, +jBox]);
    }
    return prev;
  }, []);

  if (iDiff === 1 || iDiff === -1) {
    boxesArr.sort((a, b) => (b[0] - a[0]) * iDiff);
  } else {
    boxesArr.sort((a, b) => (b[1] - a[1]) * jDiff);
  }

  for (const [iBox, jBox] of boxesArr) {
    map[iBox][jBox] = '.';
    map[iBox][jBox + 1] = '.';
    map[iBox + iDiff][jBox + jDiff] = '[';
    map[iBox + iDiff][jBox + jDiff + 1] = ']';
  }

  position = { i, j };
  map[iS][jS] = '.';
  map[i][j] = robot;
}

for (const move of moves) {
  if (move === '^') {
    attemptToMove(position.i, position.j, -1, 0);
  } else if (move === 'v') {
    attemptToMove(position.i, position.j, 1, 0);
  } else if (move === '<') {
    attemptToMove(position.i, position.j, 0, -1);
  } else if (move === '>') {
    attemptToMove(position.i, position.j, 0, 1);
  }

  console.log(move);
  console.log(map.map((el) => el.join('')));
}

let coordinates = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === '[') {
      coordinates += 100 * i + j;
    }
  }
}

console.log(coordinates);
