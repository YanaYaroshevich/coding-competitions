const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const cubesObj = {};

let xMax = 0;
let xMin = 0;
let yMax = 0;
let yMin = 0;
let zMax = 0;
let zMin = 0;

lines.forEach((line) => {
  const [x, y, z] = line.split(',').map(Number);
  cubesObj[line] = { x, y, z };
  xMax = Math.max(xMax, x);
  xMin = Math.min(xMin, x);
  yMax = Math.max(yMax, y);
  yMin = Math.min(yMin, y);
  zMax = Math.max(zMax, z);
  zMin = Math.min(zMin, z);
});

const start = { x: xMin - 1, y: yMin, z: zMin };
console.log(start);

const markedEmptyCubes = { [`${start.x},${start.y},${start.z}`]: true };
const queue = [start];
let neigbourCount = 0;

while (queue.length) {
  const { x, y, z } = queue.pop();

  const neighbors = [
    `${x - 1},${y},${z}`,
    `${x + 1},${y},${z}`,
    `${x},${y - 1},${z}`,
    `${x},${y + 1},${z}`,
    `${x},${y},${z - 1}`,
    `${x},${y},${z + 1}`,
  ];

  neighbors.forEach((neig) => {
    if (!cubesObj[neig] && !markedEmptyCubes[neig]) {
      const [x, y, z] = neig.split(',').map(Number);
      if (
        x > xMax + 1
        || x < xMin - 1
        || y > yMax + 1
        || y < yMin - 1
        || z > zMax + 1
        || z < zMin - 1
      ) {
        return;
      }
      markedEmptyCubes[neig] = true;
      queue.push({ x, y, z });
    } else if (cubesObj[neig]) {
      neigbourCount++;
    }
  });
}

console.log(cubesObj);

console.log(neigbourCount);
