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

const memo = {};

function lookForTowels(design, i, acc) {
  if (i === design.length) {
    acc.count++;
    return;
  }

  if (memo[design.substring(i)]) {
    acc.count += memo[design.substring(i)];
    return;
  }

  const possibleTowels = towels[design[i]];
  if (!possibleTowels) {
    return;
  }
  for (const towel in possibleTowels) {
    if (i + towel.length > design.length) {
      continue;
    }

    const curCheck = design.substring(i, i + towel.length);
    if (curCheck === towel) {
      const curCount = acc.count;
      lookForTowels(design, i + towel.length, acc);
      if (design.substring(i + towel.length).length > 0) {
        memo[design.substring(i + towel.length)] = acc.count - curCount;
      }
    }
  }
}

const designs = contents[1].split('\n');
const acc = { count: 0 };

for (const design of designs) {
  lookForTowels(design, 0, acc);
  console.log(acc.count, design);
}

console.log(acc.count);
// console.log(memo);
