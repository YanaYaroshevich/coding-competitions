const fs = require('fs');

const boxes = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(',').map(BigInt));

const distances = {};

for (let i = 0; i < boxes.length; i++) {
  for (let j = i; j < boxes.length; j++) {
    if (i === j) {
      continue;
    }
    const ind = `${i}-${j}`;
    if (distances[ind] || distances[`${j}-${i}`]) {
      continue;
    }
    const paw = BigInt(2);
    distances[ind] = (boxes[i][0] - boxes[j][0]) ** paw + (boxes[i][1] - boxes[j][1]) ** paw + (boxes[i][2] - boxes[j][2]) ** paw;
  }
}

const sorted = Object.entries(distances).sort((a, b) => {
  if (a[1] > b[1]) return 1;
  if (b[1] > a[1]) return -1;
  return 0;
});

const connections = [sorted[0][0].split('-')];

console.log(connections);

for (let i = 1; i < 1000; i++) {
  const [index1, index2] = sorted[i][0].split('-');

  let isAdded = false;
  for (let j = 0; j < connections.length; j++) {
    if (connections[j].includes(index1)) {
      connections[j].push(index2);
      isAdded = true;
      break;
    }
    if (connections[j].includes(index2)) {
      connections[j].push(index1);
      isAdded = true;
      break;
    }
  }

  if (!isAdded) {
    connections.push([index1, index2]);
  }
}

connections.sort((a, b) => b.length - a.length);

console.log(connections);

let mul = 1;
for (let i = 0; i < 3; i++) {
  mul *= connections[i].length;
}

console.log(mul);
