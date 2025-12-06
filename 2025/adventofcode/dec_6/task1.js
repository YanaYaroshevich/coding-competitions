const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const lines = [];
for (let i = 0; i < contents.length - 1; i++) {
  lines.push(contents[i].trim().split(/\s+/).map(Number));
}

const actions = contents[contents.length - 1].trim().split(/\s+/);
let total = 0;

for (let i = 0; i < actions.length; i++) {
  if (actions[i] === '*') {
    let res = 1;
    for (let j = 0; j < lines.length; j++) {
      res *= lines[j][i];
    }
    total += res;
    continue;
  }

  if (actions[i] === '+') {
    let res = 0;
    for (let j = 0; j < lines.length; j++) {
      res += lines[j][i];
    }
    total += res;
  }
}

console.log(total);
