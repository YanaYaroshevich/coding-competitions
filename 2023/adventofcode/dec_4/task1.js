const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

let allPoints = 0;
lines.forEach((line) => {
  const [winNums, myNums] = line
    .replace(/Card\s+\d+: /, '')
    .split(' | ')
    .map((numsStr) => numsStr.split(/\s+/).map((s) => +s).sort((a, b) => a - b));

  console.log(winNums, myNums);
  const resNums = [];

  let i = 0;
  let j = 0;
  while (i < myNums.length && j < winNums.length) {
    if (myNums[i] > winNums[j]) {
      j++;
      continue;
    }
    if (myNums[i] < winNums[j]) {
      i++;
      continue;
    }
    if (myNums[i] === winNums[j]) {
      resNums.push(myNums[i]);
      i++;
      j++;
    }
  }

  const finalPoints = resNums.length === 0 ? 0 : 2 ** (resNums.length - 1);
  allPoints += finalPoints;
});

console.log(allPoints);
