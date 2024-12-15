const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const map = contents[0].split('\n').map((line) => line.split(''));
const robot = '@';
let position;

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === robot) {
      position = { i, j };
      break;
    }
  }
}

const moves = contents[1].split('\n').join('').split('');

function attemptToMove(symb, iS, jS, iDiff, jDiff) {
  const i = iS + iDiff;
  const j = jS + jDiff;

  if (map[i][j] === '#') {
    return;
  }
  if (map[i][j] === '.') {
    if (symb === robot) {
      position = { i, j };
    }
    map[iS][jS] = '.';
    map[i][j] = symb;
    return;
  }
  if (map[i][j] === 'O') {
    let hasSpace = false;

    if (iDiff === 1 || iDiff === -1) {
      for (let k = i; k < map.length; k += iDiff) {
        if (map[k][j] === '#') {
          hasSpace = false;
          break;
        }

        if (map[k][j] === '.') {
          hasSpace = true;
          break;
        }
      }
    } else if (jDiff === 1 || jDiff === -1) {
      for (let l = j; l < map[i].length; l += jDiff) {
        if (map[i][l] === '#') {
          hasSpace = false;
          break;
        }

        if (map[i][l] === '.') {
          hasSpace = true;
          break;
        }
      }
    }

    if (!hasSpace) {
      return;
    }

    attemptToMove('O', i, j, iDiff, jDiff);
    attemptToMove(symb, iS, jS, iDiff, jDiff);
  }
}

for (const move of moves) {
  if (move === '^') {
    attemptToMove(robot, position.i, position.j, -1, 0);
  } else if (move === 'v') {
    attemptToMove(robot, position.i, position.j, 1, 0);
  } else if (move === '<') {
    attemptToMove(robot, position.i, position.j, 0, -1);
  } else if (move === '>') {
    attemptToMove(robot, position.i, position.j, 0, 1);
  }
}

let coordinates = 0;
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === 'O') {
      coordinates += 100 * i + j;
    }
  }
}

console.log(coordinates);
