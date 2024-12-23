const fs = require('fs');

const secrets = fs.readFileSync('input.txt', 'utf8').split('\n').map(BigInt);

const modul = 16777216n;

function getNewSecretNumber(prev) {
  let secretNumber = prev;
  secretNumber = ((secretNumber * 64n) ^ secretNumber) % modul;
  secretNumber = ((secretNumber / 32n) ^ secretNumber) % modul;
  secretNumber = ((secretNumber * 2048n) ^ secretNumber) % modul;
  return secretNumber;
}

const memo = {};
const range = 4;
let max = 0;

for (let j = 0; j < secrets.length; j++) {
  let diffs = [];
  const isChecked = {};
  let prev;

  for (let i = 0; i < 2000; i++) {
    const newSecretNumber = getNewSecretNumber(secrets[j]);
    const newPrice = newSecretNumber % 10n;
    const oldPrice = secrets[j] % 10n;

    diffs.push(newPrice - oldPrice);
    secrets[j] = newSecretNumber;

    if (!prev) {
      prev = secrets[j];
    }

    if (diffs.length < range) {
      continue;
    }

    const key = diffs.join('+');
    secrets[j] = prev;
    prev = null;
    diffs = [];
    i -= 3;

    if (isChecked[key]) {
      continue;
    }

    const newVal = (memo[key] ?? 0n) + newPrice;
    max = max < newVal ? newVal : max;

    memo[key] = newVal;
    isChecked[key] = true;
  }
  console.log(j);
}

console.log(max);
