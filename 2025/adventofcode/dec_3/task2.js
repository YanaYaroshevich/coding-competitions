const fs = require('fs');

const banks = fs.readFileSync('input.txt', 'utf8').split(/\n/).map((bank) => bank.split(''));

let sum = 0;

function findBiggestToTheRight(arr, str, i, acc) {
  if (i > arr.length) {
    return false;
  }
  if (i === 0) {
    acc.res = str;
    return true;
  }
  if (i === arr.length) {
    acc.res = str + arr.join('');
    return true;
  }

  const map = arr.reduce((prev, num, i) => ({ ...prev, [i]: +num }), {});

  while (Object.keys(map).length) {
    let max = -Infinity;
    let maxI = -Infinity;
    for (const j in map) {
      if (map[j] > max) {
        max = map[j];
        maxI = +j;
      }
    }
    if (findBiggestToTheRight(arr.slice(maxI + 1), str + max, i - 1, acc)) {
      return true;
    }
    delete map[maxI];
  }

  return false;
}

banks.forEach((bank) => {
  const acc = { res: '' };
  findBiggestToTheRight(bank, '', 12, acc);

  console.log(bank, acc);

  sum += +acc.res;
});

console.log(sum);
