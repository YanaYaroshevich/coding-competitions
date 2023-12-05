const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const neededSeedRanges = [];
const maps = [];

for (let i = 0; i < lines.length;) {
  if (lines[i] === '') {
    i++;
  }

  if (i === 0) {
    const inpSeeds = [...lines[i].matchAll(/\d+/g)].map((m) => +m[0]);
    for (let j = 0; j < inpSeeds.length; j += 2) {
      neededSeedRanges.push([inpSeeds[j], inpSeeds[j] + inpSeeds[j + 1]]);
    }
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

let min = Infinity;
neededSeedRanges.forEach((range) => {
  for (let s = range[0]; s < range[1]; s++) {
    let currentNum = s;
    maps.forEach((m) => {
      for (let i = 0; i < m.length; i++) {
        if (m[i].sourceS <= currentNum && currentNum < m[i].sourceS + m[i].length) {
          currentNum = m[i].destS - m[i].sourceS + currentNum;
          // console.log(currentNum);
          break;
        }
      }
    });
    // console.log(currentNum);
    if (min > currentNum) {
      console.log(currentNum);
      min = currentNum;
    }
  }
});

console.log(min);
