const fs = require('fs');

const secrets = fs.readFileSync('input.txt', 'utf8').split('\n').map(BigInt);

const modul = 16777216n;

for (let i = 0; i < 2000; i++) {
  for (let j = 0; j < secrets.length; j++) {
    let secretNumber = secrets[j];
    secretNumber = ((secretNumber * 64n) ^ secretNumber) % modul;
    secretNumber = ((secretNumber / 32n) ^ secretNumber) % modul;
    secretNumber = ((secretNumber * 2048n) ^ secretNumber) % modul;
    secrets[j] = secretNumber;
  }
  console.log(i, secrets);
}

console.log(secrets.reduce((prev, cur) => prev + cur, 0n));
