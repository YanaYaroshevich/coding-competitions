const fs = require('fs');

const contents = fs.readFileSync('input2.txt', 'utf8');
const lines = contents.split('\n');

function mapInputStringToObject(str) {
  const colors = /red|green|blue/g;
  return str.split(',').reduce((obj, s) => {
    const color = s.match(colors);
    return { ...obj, [color]: +s.replace(color, '') };
  }, {});
}

let sumPower = 0;
lines.forEach((line, i) => {
  const sets = line.toLocaleLowerCase().replace(/\s/g, '').replace(`game${i + 1}:`, '').split(';');
  const neededObj = sets.reduce((output, set) => {
    const acc = { ...output };
    const setObj = mapInputStringToObject(set);
    Object.keys(setObj).forEach((c) => {
      if (setObj[c] > output[c]) {
        acc[c] = setObj[c];
      }
    });
    return acc;
  }, mapInputStringToObject('0red,0blue,0green'));
  sumPower += neededObj.green * neededObj.blue * neededObj.red;
});

console.log(sumPower);
