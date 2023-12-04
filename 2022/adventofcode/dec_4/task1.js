const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const res = lines.reduce((acc, line) => {
  const assignments = line.split(',');

  const firstElf = assignments[0].split('-').map(Number);
  const scndElf = assignments[1].split('-').map(Number);

  if (firstElf[0] >= scndElf[0] && firstElf[1] <= scndElf[1]) {
    return acc + 1;
  }
  if (firstElf[0] <= scndElf[0] && firstElf[1] >= scndElf[1]) {
    return acc + 1;
  }
  return acc;
}, 0);

console.log(res);
