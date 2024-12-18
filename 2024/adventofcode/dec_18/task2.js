const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const bytesLimit = 1024;

const corruptedBytes = contents.reduce((prev, cur, k) => {
  if (k + 1 > bytesLimit) {
    return prev;
  }

  const [j, i] = cur.split(',').map(Number);
  if (!prev[i]) {
    prev[i] = {};
  }
  prev[i][j] = true;
  return prev;
}, {});

const maxI = 70;
const maxJ = 70;

for (let i = 0; i <= maxI; i++) {
  let row = '';
  for (let j = 0; j <= maxJ; j++) {
    if (corruptedBytes[i] && corruptedBytes[i][j]) {
      row += '#';
    } else {
      row += '.';
    }
  }
  console.log(row);
}

function run() {
  const start = [0, 0];
  const queue = [start];

  const marked = { 0: { 0: 0 } };

  while (queue.length) {
    const [i, j] = queue.shift();
    if (corruptedBytes[i] && corruptedBytes[i][j]) {
      continue;
    }

    if (i === maxI && j === maxJ) {
      break;
    }

    const newVal = marked[i][j] + 1;

    if (i < maxI && !marked[i + 1]?.[j]) {
      queue.push([i + 1, j]);
      marked[i + 1] = marked[i + 1] || {};
      marked[i + 1][j] = newVal;
    }
    if (j < maxJ && !marked[i]?.[j + 1]) {
      queue.push([i, j + 1]);
      marked[i] = marked[i] || {};
      marked[i][j + 1] = newVal;
    }
    if (i > 0 && !marked[i - 1]?.[j]) {
      queue.push([i - 1, j]);
      marked[i - 1] = marked[i - 1] || {};
      marked[i - 1][j] = newVal;
    }
    if (j > 0 && !marked[i]?.[j - 1]) {
      queue.push([i, j - 1]);
      marked[i] = marked[i] || {};
      marked[i][j - 1] = newVal;
    }
  }

  if (marked[maxI] && marked[maxI][maxJ]) {
    return true;
  }

  return false;
}

for (let newByte = bytesLimit; newByte < contents.length; newByte++) {
  const [j, i] = contents[newByte].split(',').map(Number);
  if (!corruptedBytes[i]) {
    corruptedBytes[i] = {};
  }
  corruptedBytes[i][j] = true;

  if (!run()) {
    console.log(contents[newByte]);
    break;
  }
}
