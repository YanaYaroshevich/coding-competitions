const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

let start = 50;
const mod = 100;

let count = 0;

contents.forEach(((line) => {
  const dir = line[0];
  const num = +line.slice(1);

  if (dir === 'L') {
    let res = start - num + mod;
    while (res < 0) {
      res += mod;
    }
    start = res % mod;
    // console.log(`Turned left ${num}, now at ${start}`);
  }

  if (dir === 'R') {
    start = (start + num) % mod;
    // console.log(`Turned right ${num}, now at ${start}`);
  }

  if (start === 0) {
    count++;
    // console.log(`Passed 0, total count: ${count}`);
  }
}));

console.log(count);
