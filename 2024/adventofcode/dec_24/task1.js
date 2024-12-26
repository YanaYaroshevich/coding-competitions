const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const input = contents[0].split('\n');
const values = {};

for (let i = 0; i < input.length; i++) {
  const [key, value] = input[i].split(': ');
  values[key] = +value;
}

const expressions = contents[1].split('\n').map((exp) => {
  const [part1, res] = exp.split(' -> ');
  const [arg1, operator, arg2] = part1.split(' ');

  return {
    arg1, operator, arg2, res,
  };
});

let count = 0;
const zValues = {};

while (count < expressions.length) {
  for (let i = 0; i < expressions.length; i++) {
    const {
      arg1, operator, arg2, res,
    } = expressions[i];

    if (values[res] !== undefined) {
      continue;
    }
    if (values[arg1] === undefined || values[arg2] === undefined) {
      continue;
    }
    count++;
    switch (operator) {
      case 'AND':
        values[res] = values[arg1] & values[arg2];
        break;
      case 'OR':
        values[res] = values[arg1] | values[arg2];
        break;
      case 'XOR':
        values[res] = values[arg1] ^ values[arg2];
        break;
      default:
        break;
    }

    if (res.startsWith('z')) {
      zValues[res] = values[res];
    }
  }
}

const keys = Object.keys(zValues).sort((a, b) => b.localeCompare(a));

let res = '';
for (const key of keys) {
  res += zValues[key];
}

console.log(Number.parseInt(res, 2));
