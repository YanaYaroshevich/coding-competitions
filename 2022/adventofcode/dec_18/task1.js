/*
*

* * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const cubesObj = {};

lines.forEach((line) => {
  const [x, y, z] = line.split(",").map(Number);
  cubesObj[line] = { x, y, z, neighboursCount: 0 };
});

Object.keys(cubesObj).forEach((cube) => {
  const { x, y, z } = cubesObj[cube];
  const neighbors = [
    `${x - 1},${y},${z}`,
    `${x + 1},${y},${z}`,
    `${x},${y - 1},${z}`,
    `${x},${y + 1},${z}`,
    `${x},${y},${z - 1}`,
    `${x},${y},${z + 1}`,
  ];

  cubesObj[cube].neighboursCount += neighbors.filter(
    (neig) => cubesObj[neig]
  ).length;
});

const sum = Object.values(cubesObj).reduce((acc, cur) => {
  return acc + (6 - cur.neighboursCount);
}, 0);

console.log(sum);
