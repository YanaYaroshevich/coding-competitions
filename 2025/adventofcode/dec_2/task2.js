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

function checkInvalid(str, count) {
  const len = str.length;
  const cutLen = len / count;

  for (let i = 0; i < count - 1; i++) {
    if (str.substring(i * cutLen, (i + 1) * cutLen) !== str.substring((i + 1) * cutLen, (i + 2) * cutLen)) {
      return false;
    }
  }

  return true;
}

ranges.forEach((range) => {
  for (let num = +range.start.val; num <= +range.end.val; num++) {
    const set = new Set();
    const str = num.toString();
    const len = str.length;

    if (len === 1) {
      continue;
    }

    for (let j = len; j >= 2; j--) {
      if (len % j !== 0) {
        continue;
      }

      if (!set.has(str) && checkInvalid(str, j)) {
        set.add(str);
        count++;
        sum += +str;
        console.log(`${range.start.val}-${range.end.val}`, str);
      }
    }
  }
});

console.log(count);
console.log(sum);
