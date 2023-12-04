const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const movesMap = [];
let isFirstMovePassed = false;

const hPos = { x: 1000, y: 1000 };
const tPos = { x: 1000, y: 1000 };

const fillMap = () => {
  movesMap[tPos.x] = movesMap[tPos.x] || [];
  movesMap[tPos.x][tPos.y] = '#';
};

const allCoordinatesCover = () => tPos.x === hPos.x && tPos.y === hPos.y;

const makeTMove = () => {
  if ((hPos.x === tPos.x - 1 && hPos.y === tPos.y)
      || (hPos.x === tPos.x && hPos.y === tPos.y - 1)
      || (hPos.x === tPos.x && hPos.y === tPos.y + 1)
      || (hPos.x === tPos.x + 1 && hPos.y === tPos.y)) {
    return;
  }

  if (Math.abs(hPos.x - tPos.x) === 2 && Math.abs(hPos.y - tPos.y) === 2) {
    tPos.x = tPos.x > hPos.x ? tPos.x - 1 : tPos.x + 1;
    tPos.y = tPos.y > hPos.y ? tPos.y - 1 : tPos.y + 1;
    fillMap();
    return;
  }

  if (Math.abs(hPos.x - tPos.x) === 2 && Math.abs(hPos.y - tPos.y) === 1) {
    tPos.x = tPos.x > hPos.x ? tPos.x - 1 : tPos.x + 1;
    tPos.y = hPos.y;
    fillMap();
    return;
  }

  if (Math.abs(hPos.y - tPos.y) === 2 && Math.abs(hPos.x - tPos.x) === 1) {
    tPos.y = tPos.y > hPos.y ? tPos.y - 1 : tPos.y + 1;
    tPos.x = hPos.x;
    fillMap();
    return;
  }

  if (hPos.x === tPos.x) {
    tPos.y = hPos.y > tPos.y ? tPos.y + 1 : tPos.y - 1;
    fillMap();
    return;
  }

  if (hPos.y === tPos.y) {
    tPos.x = hPos.x > tPos.x ? tPos.x + 1 : tPos.x - 1;
    fillMap();
  }
};

lines.forEach((line) => {
  const [where, howMany] = line.split(' ');

  for (let i = 0; i < howMany; i++) {
    switch (where) {
      case 'R':
        hPos.x++;

        if (allCoordinatesCover()) {
          break;
        }

        if (!isFirstMovePassed) {
          fillMap();
          isFirstMovePassed = true;
          break;
        }
        makeTMove();
        break;
      case 'U':
        hPos.y++;

        if (allCoordinatesCover()) {
          break;
        }

        if (!isFirstMovePassed) {
          fillMap();
          isFirstMovePassed = true;
          break;
        }
        makeTMove();
        break;
      case 'L':
        hPos.x--;

        if (allCoordinatesCover()) {
          break;
        }

        if (!isFirstMovePassed) {
          fillMap();
          isFirstMovePassed = true;
          break;
        }
        makeTMove();
        break;
      case 'D':
        hPos.y--;

        if (allCoordinatesCover()) {
          break;
        }

        if (!isFirstMovePassed) {
          fillMap();
          isFirstMovePassed = true;
          break;
        }
        makeTMove();
        break;
      default:
        console.log('error parsing input');
        break;
    }
  }
});

let maxL = 0;
for (let i = 0; i < movesMap.length; i++) {
  if (movesMap[i]?.length > maxL) {
    maxL = movesMap[i].length;
  }
}

let count = 0;

for (let i = 0; i < movesMap.length; i++) {
  if (!movesMap[i]) {
    continue;
  }

  for (let j = 0; j < maxL; j++) {
    if (movesMap[i][j] === '#') {
      count++;
    }
    movesMap[i][j] = movesMap[i][j] || '.';
  }
}

console.log(movesMap);
console.log(count);
