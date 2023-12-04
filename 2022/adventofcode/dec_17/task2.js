const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const figures = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`
  .split('\n\n')
  .map((fig) => fig.split('\n').reduce(
    (acc, row, j, arr) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === '#') {
          acc.coords.push({ x: i, y: j });
          if (j > acc.maxY) {
            acc.maxY = j;
          }
        }
      }

      if (j === 0) {
        acc.width = row.length;
        acc.height = arr.length;
      }
      return acc;
    },
    {
      coords: [], height: 0, width: 0, maxY: 0,
    },
  ));

// console.log(figures);

const movesCount = 1000000000000;
const cave = [];
const caveWidth = 7;

let highestPoint = 0;
let caveHeight = 0;

let movePos = 0;
let flag = false;

const memory = {};

for (let rockI = 0; rockI < movesCount; rockI++) {
  const curFigure = figures[rockI % figures.length];

  if (rockI % figures.length === 0) {
    const memoryKey = JSON.stringify(cave.slice(0, 50).join(''));

    if (memory[memoryKey] && !flag) {
      console.log(rockI);
      const mod = (movesCount - memory[memoryKey].rockI)
        % (rockI - memory[memoryKey].rockI);
      const dif = (movesCount - memory[memoryKey].rockI - mod)
        / (rockI - memory[memoryKey].rockI);

      highestPoint = memory[memoryKey].highestPoint
        + (highestPoint - memory[memoryKey].highestPoint) * dif;
      rockI = movesCount - mod;
      flag = true;
    } else {
      memory[memoryKey] = { highestPoint, rockI };
    }
  }

  while (cave.length < caveHeight + curFigure.height + 3) {
    cave.unshift(Array(caveWidth).fill('.'));
  }

  const curPosition = { x: 2, y: 0 };
  while (true) {
    const offsetHor = contents[movePos % contents.length] === '>' ? 1 : -1;
    movePos++;
    const canMoveHor = curFigure.coords.every(
      (coord) => cave[curPosition.y + coord.y]?.[curPosition.x + offsetHor + coord.x]
        === '.',
    );

    if (canMoveHor) {
      curPosition.x += offsetHor;

      /* const caveOutput = JSON.parse(JSON.stringify(cave));
            curFigure.coords.forEach((coord) => {
              caveOutput[curPosition.y + coord.y][curPosition.x + coord.x] = "%";
            });
            outputCave(caveOutput);
            console.log("--------------------------------"); */
    }

    const canMoveVer = curFigure.coords.every(
      (coord) => cave[curPosition.y + coord.y + 1]?.[curPosition.x + coord.x] === '.',
    );

    if (!canMoveVer) {
      const tmp = Math.max(...[caveHeight, cave.length - curPosition.y]);
      highestPoint += tmp - caveHeight;
      caveHeight = tmp;
      // console.log(highestPoint);
      curFigure.coords.forEach((coord) => {
        cave[curPosition.y + coord.y][curPosition.x + coord.x] = '#';
      });

      while (cave.length > caveHeight) {
        cave.shift();
      }
      break;
    }

    curPosition.y += 1;

    /* const caveOutput = JSON.parse(JSON.stringify(cave));
        curFigure.coords.forEach((coord) => {
          caveOutput[curPosition.y + coord.y][curPosition.x + coord.x] = "%";
        });
        outputCave(caveOutput);
        console.log("--------------------------------"); */
  }
}

console.log(highestPoint);
