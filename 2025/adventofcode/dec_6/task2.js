const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const actions = contents[contents.length - 1].trim().split(/\s+/);
contents.splice(contents.length - 1, 1);

const lineLength = contents[0].length;

let k = 0;
let numbers = [];

let total = 0;
for (let j = 0; j < lineLength; j++) {
  if (contents.some((line) => line[j] !== ' ')) {
    let res = '';
    for (let i = 0; i < contents.length; i++) {
      res = contents[i][j] === ' ' ? res : res + contents[i][j];
    }
    numbers.push(+res);
  } else {
    total += numbers.reduce((acc, curr) => (actions[k] === '*' ? acc * curr : acc + curr), actions[k] === '*' ? 1 : 0);
    numbers = [];
    k++;
  }
}

total += numbers.reduce((acc, curr) => (actions[k] === '*' ? acc * curr : acc + curr), actions[k] === '*' ? 1 : 0);

console.log(total);
