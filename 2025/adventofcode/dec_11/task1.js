const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n');
const map = {};

input.forEach((item) => {
  const points = item.split(/:* /);
  map[points[0]] = points.slice(1);
});

const start = 'you';
const finish = 'out';

function goNext(curr, count) {
  if (curr === finish) {
    return count;
  }
  let acc = 0;
  for (const point of map[curr]) {
    acc += goNext(point, 1);
  }
  return acc;
}

console.log(goNext(start, 0));
