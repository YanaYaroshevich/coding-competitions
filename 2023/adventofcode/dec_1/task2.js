const fs = require('fs');

const contents = fs.readFileSync('input2.txt', 'utf8');
const lines = contents.split('\n');

const digits = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const calibrationNumbers = lines.map((line) => {
  const minD = {}; const
    maxD = {};

  digits.forEach((d, val) => {
    const ind = line.indexOf(d);
    const lastInd = line.lastIndexOf(d);
    if (ind === -1) {
      return;
    }
    if (minD.i === undefined || ind < minD.i) {
      minD.i = ind;
      minD.val = val;
    }
    if (maxD.i === undefined || lastInd > maxD.i) {
      maxD.i = lastInd;
      maxD.val = val;
    }
  });

  console.log(minD, maxD);

  let firstDigit; let
    lastDigit;
  let firstI; let
    lastI;
  for (let i = 0; i < line.length; i++) {
    const digit = +line[i];
    if (Number.isNaN(digit)) {
      continue;
    }
    if (firstDigit === undefined) {
      firstI = i;
      firstDigit = digit;
      lastI = i;
      lastDigit = digit;
      continue;
    }
    lastI = i;
    lastDigit = digit;
  }

  if (firstI === undefined || firstI > minD.i) {
    firstDigit = minD.val;
  }
  if (lastI === undefined || lastI < maxD.i) {
    lastDigit = maxD.val;
  }

  return `${firstDigit}${lastDigit}`;
});

console.log(calibrationNumbers);

const sum = calibrationNumbers.reduce((prev, cur) => prev + +cur, 0);
console.log(sum);
