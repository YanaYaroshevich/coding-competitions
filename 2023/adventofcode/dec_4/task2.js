const fs = require('fs');

const contents = fs.readFileSync('input2.txt', 'utf8');
const lines = contents.split('\n');

const results = [];
lines.forEach((line) => {
  const [winNums, myNums] = line
    .replace(/Card\s+\d+: /, '')
    .split(' | ')
    .map((numsStr) => numsStr.split(/\s+/).map((s) => +s).sort((a, b) => a - b));

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

  results.push(resNums.length);
});

console.log(results);
const newResults = new Array(results.length).fill(1);

for (let k = 0; k < results.length; k++) {
  for (let j = k + 1; j < Math.min(k + 1 + results[k], results.length); j++) {
    newResults[j] += newResults[k];
  }
}

console.log(newResults.reduce((prev, cur) => prev + cur, 0));
