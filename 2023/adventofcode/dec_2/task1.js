const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

function mapInputStringToObject(str) {
  const colors = /red|green|blue/g;
  return str.split(',').reduce((obj, s) => {
    const color = s.match(colors);
    return { ...obj, [color]: +s.replace(color, '') };
  }, {});
}

const input = '12red,13green,14blue';
const inputObj = mapInputStringToObject(input);

let failedGamesSum = 0;
lines.forEach((line, i) => {
  const sets = line.toLocaleLowerCase().replace(/\s/g, '').replace(`game${i + 1}:`, '').split(';');
  const flag = sets.some((set) => {
    const setObj = mapInputStringToObject(set);
    return Object.keys(setObj).some((c) => setObj[c] > inputObj[c]);
  });
  failedGamesSum = flag ? failedGamesSum : failedGamesSum + i + 1;
});

console.log(failedGamesSum);
