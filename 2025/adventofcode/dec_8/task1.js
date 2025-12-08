const fs = require('fs');

const boxes = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(',').map(Number));

const distances = {};

for (let i = 0; i < boxes.length; i++) {
  for (let j = i; j < boxes.length; j++) {
    if (i === j) {
      continue;
    }
    const ind = `${i}-${j}`;
    if (distances[ind] !== undefined || distances[`${j}-${i}`] !== undefined) {
      continue;
    }
    distances[ind] = (boxes[i][0] - boxes[j][0]) ** 2 + (boxes[i][1] - boxes[j][1]) ** 2 + (boxes[i][2] - boxes[j][2]) ** 2;
  }
}

const sorted = Object.entries(distances).sort((a, b) => a[1] - b[1]);

const connections = [sorted[0][0].split('-')];

console.log(connections);

for (let i = 1; i < 1000; i++) {
  const [index1, index2] = sorted[i][0].split('-');

  let foundA = -1;
  let foundB = -1;

  for (let c = 0; c < connections.length; c++) {
    if (connections[c].includes(index1)) foundA = c;
    if (connections[c].includes(index2)) foundB = c;
  }

  if (foundA !== -1 && foundB !== -1 && foundA === foundB) {
    continue;
  } else if (foundA !== -1 && foundB === -1) {
    connections[foundA].push(index2);
  } else if (foundA === -1 && foundB !== -1) {
    connections[foundB].push(index1);
  } else if (foundA !== -1 && foundB !== -1 && foundA !== foundB) {
    const merged = [...connections[foundA], ...connections[foundB]];
    connections.splice(foundB, 1);
    connections.splice(foundA, 1);
    connections.push(merged);
  } else {
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
