const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const firstArr = [];
const secondMap = {};

for (let i = 0; i < lines.length; i++) {
    const [first, second] = lines[i].split(/\s+/).map(Number);
    firstArr.push(first);
    secondMap[second] = secondMap[second] ? secondMap[second] + 1 : 1;
}

const similarities = firstArr.reduce((prev, cur) => {
    return prev + (secondMap[cur] ?? 0) * +cur;
}, 0);

console.log(similarities);

