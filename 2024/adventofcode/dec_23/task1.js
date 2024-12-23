const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const adjacencyMap = {};

for (const line of contents) {
  const [from, to] = line.split('-');

  if (!adjacencyMap[from]) {
    adjacencyMap[from] = {};
  }
  adjacencyMap[from][to] = true;
}

const nodes = Object.keys(adjacencyMap);

// console.log(nodes.length);
const adjacencyMatrix = new Array(nodes.length).fill([]).map(() => new Array(nodes.length).fill(0));

for (const key in adjacencyMap) {
  for (const to in adjacencyMap[key]) {
    const index = nodes.indexOf(key);
    const index1 = nodes.indexOf(to);
    adjacencyMatrix[index][index1] = 1;
    adjacencyMatrix[index1][index] = 1;
  }
}

// console.log(adjacencyMatrix.map((row) => row.join(' ')).join('\n'));

function multiply(a, b) {
  const aNumRows = a.length; const aNumCols = a[0].length;
  const bNumCols = b[0].length;
  const m = new Array(aNumRows);
  for (let r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols);
    for (let c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;
      for (let i = 0; i < aNumCols; ++i) {
        m[r][c] += a[r][i] * b[i][c];
      }
    }
  }
  return m;
}

const newMatrix = multiply(adjacencyMatrix, adjacencyMatrix);

console.log('--------');

// console.log(newMatrix.map((row) => row.join(' ')).join('\n'));

const map = {};

for (let i = 0; i < newMatrix.length; i++) {
  for (let j = 0; j < newMatrix[i].length; j++) {
    for (let k = 0; k < newMatrix[j].length; k++) {
      if (j === k || i === j || i === k) {
        continue;
      }
      const arr = [i, j, k].sort((a, b) => a - b);
      const key = arr.join('-');
      if (adjacencyMatrix[i][k] === 1 && adjacencyMatrix[i][j] === 1 && adjacencyMatrix[j][k] === 1 && newMatrix[i][k] >= 1 && newMatrix[i][j] >= 1 && newMatrix[j][k] >= 1 && !map[key]) {
        map[key] = true;
      }
    }
  }
}

const keys = Object.keys(map);
const allLoops = keys.map((val) => val.split('-').map((val) => nodes[val]).join('-'));
const filteredLoops = allLoops.filter((key) => key.split('-').some((v) => v.startsWith('t')));

console.log(filteredLoops.length);
