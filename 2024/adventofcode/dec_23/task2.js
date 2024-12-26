const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const adjacencyMap = {};

for (const line of contents) {
  const [from, to] = line.split('-');

  if (!adjacencyMap[from]) {
    adjacencyMap[from] = {};
  }
  adjacencyMap[from][to] = true;

  if (!adjacencyMap[to]) {
    adjacencyMap[to] = {};
  }
  adjacencyMap[to][from] = true;
}

const nodes = Object.keys(adjacencyMap);

const adjacencyMatrix = new Array(nodes.length).fill([]).map(() => new Array(nodes.length).fill(0));

for (const key in adjacencyMap) {
  for (const to in adjacencyMap[key]) {
    const index = nodes.indexOf(key);
    const index1 = nodes.indexOf(to);
    adjacencyMatrix[index][index1] = 1;
    adjacencyMatrix[index1][index] = 1;
  }
}

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
function get3Loops() {
  const newMatrix = multiply(adjacencyMatrix, adjacencyMatrix);

  const map = {};

  for (let i = 0; i < newMatrix.length; i++) {
    for (let j = 0; j < newMatrix[i].length; j++) {
      for (let k = 0; k < newMatrix[j].length; k++) {
        if (j === k || i === j || i === k) {
          continue;
        }
        const arr = [i, j, k].sort((a, b) => a - b);
        const key = arr.join(',');
        if (adjacencyMatrix[i][k] === 1 && adjacencyMatrix[i][j] === 1 && adjacencyMatrix[j][k] === 1 && newMatrix[i][k] >= 1 && newMatrix[i][j] >= 1 && newMatrix[j][k] >= 1 && !map[key]) {
          map[key] = true;
        }
      }
    }
  }

  const keys = Object.keys(map);
  return keys.map((val) => val.split(',').map((val) => nodes[val]).sort().join(','));
}

const uniqueLoops = get3Loops();

console.log(uniqueLoops.length);

let max = 3;

const uniqueLoopsSet = new Set(uniqueLoops);

for (const loop of uniqueLoopsSet) {
  const map = {};
  const loopArr = loop.split(',');
  for (const node of loopArr) {
    for (const key in adjacencyMap[node]) {
      if (loopArr.includes(key)) {
        continue;
      }
      map[key] = map[key] ? map[key] + 1 : 1;
    }
  }

  for (const key in map) {
    if (map[key] === loopArr.length) {
      const newLoop = [...loopArr, key].sort().join(',');

      if (loopArr.length + 1 > max) {
        max = loopArr.length + 1;
        console.log(max);
      }

      uniqueLoopsSet.add(newLoop);
    }
  }
}

console.log(max);
console.log([...uniqueLoopsSet.values()].find((val) => val.split(',').length === max));
