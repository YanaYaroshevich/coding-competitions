const fs = require('fs');

const matr = fs.readFileSync('input.txt', 'utf8').split(/\n/).map((row) => row.split(''));

console.log(matr);

const visited = {};

function checkNeighbours(i, j) {
  const steps = [-1, 0, 1];

  let count = 0;
  for (let k = 0; k < steps.length; k++) {
    const step = steps[k];

    if (i + step < 0 || i + step >= matr.length) {
      continue;
    }

    for (let m = 0; m < steps.length; m++) {
      const step2 = steps[m];

      if (step === 0 && step2 === 0) {
        continue;
      }

      if (j + step2 < 0 && j + step2 >= matr[i + step].length) {
        continue;
      }

      if (!visited[i + step]?.[j + step2] && matr[i + step][j + step2] === '@') {
        count++;
      }
    }
  }

  if (count < 4) {
    if (!visited[i]) {
      visited[i] = {};
    }
    visited[i][j] = true;
  }
}

let curSnapShot = -Infinity;
let newSnapShot = 0;

function getSnapShot() {
  return Object.keys(visited).reduce((prev, key) => prev + Object.keys(visited[key]).length, 0);
}

while (curSnapShot !== newSnapShot) {
  curSnapShot = newSnapShot;
  for (let i = 0; i < matr.length; i++) {
    for (let j = 0; j < matr[i].length; j++) {
      if (matr[i][j] === '@') {
        checkNeighbours(i, j);
      }
    }
  }
  newSnapShot = getSnapShot();
  console.log(newSnapShot - curSnapShot);
}

console.log(getSnapShot());
