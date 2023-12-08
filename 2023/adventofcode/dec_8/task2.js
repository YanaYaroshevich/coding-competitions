const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const instructions = lines[0];
const nodesMap = {};
const startNodes = new Set();

function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

for (let i = 2; i < lines.length; i++) {
  const nodes = lines[i].match(/\d*[A-Z]+/g);
  nodesMap[nodes[0]] = { R: nodes[2], L: nodes[1] };
  if (nodes[0][2] === 'A') startNodes.add(nodes[0]);
}

const currentNodes = [...startNodes];
const steps = new Array(currentNodes.length).fill(0);

for (let i = 0; i < currentNodes.length; i++) {
  let currentNode = currentNodes[i];
  let j = 0;
  for (; currentNode[2] !== 'Z'; j++) {
    currentNode = nodesMap[currentNode][instructions[j % instructions.length]];
    steps[i]++;
  }
  console.log(currentNodes[i], steps[i]);
}

console.log(steps.reduce((prev, cur) => lcm(prev, cur), steps[0]));
