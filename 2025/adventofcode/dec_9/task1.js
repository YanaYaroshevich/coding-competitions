const fs = require('fs');

const redCoords = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(',').reverse().map(BigInt));

function abs(x) {
  return x < 0 ? -x : x;
}

function getArea(point1, point2) {
  return (abs(point1[0] - point2[0]) + 1n) * (abs(point1[1] - point2[1]) + 1n);
}

let maxArea = 0n;
for (let i = 0; i < redCoords.length; i++) {
  for (let j = 0; j < redCoords.length; j++) {
    if (i === j) continue;
    const newArea = getArea(redCoords[i], redCoords[j]);
    if (newArea > maxArea) maxArea = newArea;
  }
}

console.log(maxArea);
