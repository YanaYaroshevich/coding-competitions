const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const instructions = lines[0];
const nodesMap = {};

for (let i = 2; i < lines.length; i++) {
  const nodes = lines[i].match(/[A-Z]+/g);
  nodesMap[nodes[0]] = { R: nodes[2], L: nodes[1] };
}

let currentNode = 'AAA';
let steps = 0;

while (currentNode !== 'ZZZ') {
  for (let j = 0; j < instructions.length; j++) {
    if (currentNode === 'ZZZ') { break; }
    currentNode = nodesMap[currentNode][instructions[j]];
    steps++;
  }
}

console.log(currentNode, steps);
