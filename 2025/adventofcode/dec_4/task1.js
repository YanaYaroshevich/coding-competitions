const fs = require('fs');

const matr = fs.readFileSync('input.txt', 'utf8').split(/\n/).map((row) => row.split(''));

console.log(matr);

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

      if (matr[i + step][j + step2] === '@') {
        count++;
      }
    }
  }

  return count < 4;
}

let count = 0;
for (let i = 0; i < matr.length; i++) {
  for (let j = 0; j < matr[i].length; j++) {
    if (matr[i][j] === '@') {
      if (checkNeighbours(i, j)) {
        console.log(i, j);
        count++;
      }
    }
  }
}

console.log(count);
