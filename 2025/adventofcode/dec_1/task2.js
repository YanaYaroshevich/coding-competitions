const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

let start = 50;
const mod = 100;

let count = 0;

contents.forEach(((line) => {
  const dir = line[0];
  const num = +line.slice(1);

  if (dir === 'L') {
    let res = start - num;
    while (res < 0) {
      count++;
      res += mod;
    }
    start = res % mod;
    console.log(line, count);
  }

  if (dir === 'R') {
    count += Math.floor((start + num) / mod);
    start = (start + num) % mod;
    console.log(line, count);
  }
}));

console.log(count);
