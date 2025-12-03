const fs = require('fs');

const banks = fs.readFileSync('input.txt', 'utf8').split(/\n/).map((bank) => bank.split(''));

let sum = 0;

banks.forEach((bank) => {
  let max = -Infinity;
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const num = +(bank[i] + bank[j]);
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(max);
  sum += max;
});

console.log(sum);
