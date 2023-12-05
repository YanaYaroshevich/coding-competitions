const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const neededSeeds = [];
const maps = [];

for (let i = 0; i < lines.length;) {
  if (lines[i] === '') {
    i++;
  }

  if (i === 0) {
    neededSeeds.push(...[...lines[i].matchAll(/\d+/g)].map((m) => +m[0]));
    i++;
    continue;
  }

  if (lines[i].includes('map')) {
    i++;
    maps.push([]);
    while (lines[i]) {
      const nums = lines[i].split(/\s+/);
      maps[maps.length - 1].push({ destS: +nums[0], sourceS: +nums[1], length: +nums[2] });
      i++;
    }
  }
}

const locations = [];
neededSeeds.forEach((s) => {
  let currentNum = s;
  maps.forEach((m) => {
    for (let i = 0; i < m.length; i++) {
      if (m[i].sourceS <= currentNum && currentNum < m[i].sourceS + m[i].length) {
        currentNum = m[i].destS - m[i].sourceS + currentNum;
        break;
      }
    }
  });
  locations.push(currentNum);
});

console.log(locations);
console.log(Math.min(...locations));
