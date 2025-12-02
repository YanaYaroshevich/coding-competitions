const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split(/[,\n]/);

const ranges = contents.filter((line) => !!line).map((line) => {
  const range = line.split('-');
  return {
    start: {
      val: range[0],
      length: range[0].length,
    },
    end: {
      val: range[1],
      length: range[1].length,
    },
  };
});

let count = 0;
let sum = 0;

ranges.forEach((range) => {
  for (let num = +range.start.val; num <= +range.end.val; num++) {
    const str = num.toString();
    const len = str.length;

    if (len % 2 === 1) {
      continue;
    }
    if (str.substring(0, len / 2) === str.substring(len / 2)) {
      count++;
      sum += +str;
      console.log(`${range.start.val}-${range.end.val}`, str);
    }
  }
});

console.log(count);
console.log(sum);
