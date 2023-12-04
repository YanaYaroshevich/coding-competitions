const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

let x = 1;

const image = new Array(6);
for (let k = 0; k < image.length; k++) {
  image[k] = '';
}

let imageIndex = 0;

const drawSymbol = () => {
  const symbInd = imageIndex % 40;
  image[Math.floor(imageIndex / 40)] += Math.abs(symbInd - x) <= 1 ? '#' : '.';
  imageIndex++;
};

let line;

while (true) {
  if (!lines.length) {
    break;
  }

  if (!line) {
    line = lines.shift();
  }

  if (line === 'noop') {
    line = null;
    drawSymbol();
    continue;
  }

  if (line !== 'noop') {
    const [, num] = line.split(' ');
    drawSymbol();
    drawSymbol();
    x += Number(num);
    line = null;
  }
}

console.log(image);
