const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const firstArr = [];
const secondArr = [];

for (let i = 0; i < lines.length; i++) {
    const [first, second] = lines[i].split(/\s+/).map(Number);
    firstArr.push(first);
    secondArr.push(second);
}

firstArr.sort((a, b) => a - b);
secondArr.sort((a, b) => a - b);

const distance = firstArr.reduce((prev, cur, i) => prev + Math.abs(cur - secondArr[i]), 0);

console.log(distance);