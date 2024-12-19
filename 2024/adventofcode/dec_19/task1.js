const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const towels = contents[0].split(', ').reduce((prev, cur) => {
  if (!prev[cur[0]]) {
    prev[cur[0]] = {};
  }
  prev[cur[0]][cur] = true;
  return prev;
}, {});

console.log(towels);

function lookForTowels(design, i) {
  if (i === design.length) {
    return true;
  }
  const possibleTowels = towels[design[i]];
  if (!possibleTowels) {
    return false;
  }
  for (const towel in possibleTowels) {
    if (i + towel.length > design.length) {
      continue;
    }
    if (design.substring(i, i + towel.length) === towel) {
      if (lookForTowels(design, i + towel.length)) {
        return true;
      }
    }
  }
  return false;
}

const designs = contents[1].split('\n');
let count = 0;

for (const design of designs) {
  if (lookForTowels(design, 0)) {
    count++;
  }
}

console.log(count);
