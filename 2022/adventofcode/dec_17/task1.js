/*
*

* * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");

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
  .split("\n\n")
  .map((fig) =>
    fig.split("\n").reduce(
      (acc, row, j, arr) => {
        for (let i = 0; i < row.length; i++) {
          if (row[i] === "#") {
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
      { coords: [], height: 0, width: 0, maxY: 0 }
    )
  );

const outputCave = (cave) => {
  let output = "";
  for (let i = 0; i < cave.length; i++) {
    output += cave[i].join("") + "\n";
  }
  console.log(output);
};

// console.log(figures);

const movesCount = 2022;
const cave = [];
const caveWidth = 7;

let highestPoint = 0;

let movePos = 0;

for (let rockI = 0; rockI < movesCount; rockI++) {
  const curFigure = figures[rockI % figures.length];

  while (cave.length > highestPoint + curFigure.height + 3) {
    cave.shift();
  }

  while (cave.length < highestPoint + curFigure.height + 3) {
    cave.unshift(Array(caveWidth).fill("."));
  }

  let curPosition = { x: 2, y: 0 };
  while (true) {
    const offsetHor = contents[movePos % contents.length] === ">" ? 1 : -1;
    movePos++;
    const canMoveHor = curFigure.coords.every(
      (coord) =>
        cave[curPosition.y + coord.y]?.[curPosition.x + offsetHor + coord.x] ===
        "."
    );

    if (canMoveHor) {
      curPosition.x += offsetHor;

      /* const caveOutput = JSON.parse(JSON.stringify(cave));
      curFigure.coords.forEach((coord) => {
        caveOutput[curPosition.y + coord.y][curPosition.x + coord.x] = "%";
      });
      outputCave(caveOutput);
      console.log("--------------------------------");*/
    }

    const canMoveVer = curFigure.coords.every(
      (coord) =>
        cave[curPosition.y + coord.y + 1]?.[curPosition.x + coord.x] === "."
    );

    if (!canMoveVer) {
      highestPoint = Math.max(...[highestPoint, cave.length - curPosition.y]);
      console.log(highestPoint);
      curFigure.coords.forEach((coord) => {
        cave[curPosition.y + coord.y][curPosition.x + coord.x] = "#";
      });
      break;
    }

    curPosition.y += 1;

    /*const caveOutput = JSON.parse(JSON.stringify(cave));
    curFigure.coords.forEach((coord) => {
      caveOutput[curPosition.y + coord.y][curPosition.x + coord.x] = "%";
    });
    outputCave(caveOutput);
    console.log("--------------------------------");*/
  }
}

// outputCave(cave);
