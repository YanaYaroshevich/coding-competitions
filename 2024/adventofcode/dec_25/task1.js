const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const locks = [];
const keys = [];

for (const sth of contents) {
  const lines = sth.split('\n').map((line) => line.split(''));
  if (lines[0].every((symb) => symb === '#')) {
    const newLock = new Array(lines[0].length).fill(0);
    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '#') {
          newLock[j] += 1;
        }
      }
    }
    newLock.height = lines.length;
    locks.push(newLock);
    continue;
  }

  const newKey = new Array(lines[0].length).fill(0);
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === '#') {
        newKey[j] += 1;
      }
    }
  }
  newKey.height = lines.length;
  keys.push(newKey);
}

let matchesCount = 0;
for (const key of keys) {
  for (const lock of locks) {
    if (key.height !== lock.height) {
      continue;
    }
    let isMatch = true;
    for (let i = 0; i < key.length; i++) {
      if (key[i] + lock[i] > lock.height) {
        isMatch = false;
        break;
      }
    }
    if (isMatch) {
      matchesCount++;
      console.log('Match found');
    }
  }
}

console.log(matchesCount);
