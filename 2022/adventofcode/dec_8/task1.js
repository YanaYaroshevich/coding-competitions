const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const treesMatr = lines.map((line) => line.split('').map(Number));
const visibilities = [];

const checkNeighbours = (i, j) => {
  let visible = 0;

  for (let k = i - 1; k >= 0; k--) {
    if (treesMatr[k][j] >= treesMatr[i][j]) {
      visible = 0;
      break;
    }
    if (treesMatr[k][j] < treesMatr[i][j]) {
      visible = 1;
    }
  }

  if (visible) {
    return visible;
  }

  for (let k = i + 1; k < treesMatr.length; k++) {
    if (treesMatr[k][j] >= treesMatr[i][j]) {
      visible = 0;
      break;
    }
    if (treesMatr[k][j] < treesMatr[i][j]) {
      visible = 1;
    }
  }

  if (visible) {
    return visible;
  }

  for (let k = j - 1; k >= 0; k--) {
    if (treesMatr[i][k] >= treesMatr[i][j]) {
      visible = 0;
      break;
    }
    if (treesMatr[i][k] < treesMatr[i][j]) {
      visible = 1;
    }
  }

  if (visible) {
    return visible;
  }

  for (let k = j + 1; k < treesMatr[i].length; k++) {
    if (treesMatr[i][k] >= treesMatr[i][j]) {
      visible = 0;
      break;
    }
    if (treesMatr[i][k] < treesMatr[i][j]) {
      visible = 1;
    }
  }
  return visible;
};

for (let i = 0; i < treesMatr.length; i++) {
  visibilities[i] = [];

  for (let j = 0; j < treesMatr[i].length; j++) {
    if (
      i === 0
      || j === 0
      || i === treesMatr.length - 1
      || j === treesMatr[i].length - 1
    ) {
      visibilities[i][j] = 1;
      continue;
    }
    visibilities[i][j] = checkNeighbours(i, j);
  }
}

console.log(visibilities);

const visibleTrees = visibilities.reduce(
  (pr, cur) => pr + cur.reduce((pr, cur) => pr + cur, 0),
  0,
);
console.log(visibleTrees);
