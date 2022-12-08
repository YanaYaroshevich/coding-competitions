/*
*

* **/

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const treesMatr = lines.map((line) => line.split("").map(Number));
const visibilities = [];

const checkNeighbours = (i, j) => {
  let tmp1 = 0;
  for (let k = i - 1; k >= 0; k--) {
    if (treesMatr[k][j] >= treesMatr[i][j]) {
      tmp1++;
      break;
    }
    if (treesMatr[k][j] < treesMatr[i][j]) {
      tmp1++;
    }
  }

  let tmp2 = 0;
  for (let k = i + 1; k < treesMatr.length; k++) {
    if (treesMatr[k][j] >= treesMatr[i][j]) {
      tmp2++;
      break;
    }
    if (treesMatr[k][j] < treesMatr[i][j]) {
      tmp2++;
    }
  }

  let tmp3 = 0;
  for (let k = j - 1; k >= 0; k--) {
    if (treesMatr[i][k] >= treesMatr[i][j]) {
      tmp3++;
      break;
    }
    if (treesMatr[i][k] < treesMatr[i][j]) {
      tmp3++;
    }
  }

  let tmp4 = 0;
  for (let k = j + 1; k < treesMatr[i].length; k++) {
    if (treesMatr[i][k] >= treesMatr[i][j]) {
      tmp4++;
      break;
    }
    if (treesMatr[i][k] < treesMatr[i][j]) {
      tmp4++;
    }
  }
  return (tmp1 || 1) * (tmp2 || 1) * (tmp3 || 1) * (tmp4 || 1);
};

let max = -Infinity;

for (let i = 0; i < treesMatr.length; i++) {
  visibilities[i] = [];

  for (let j = 0; j < treesMatr[i].length; j++) {
    if (
      i === 0 ||
      j === 0 ||
      i === treesMatr.length - 1 ||
      j === treesMatr[i].length - 1
    ) {
      visibilities[i][j] = 0;
      continue;
    }
    visibilities[i][j] = checkNeighbours(i, j);

    if (visibilities[i][j] > max) {
      max = visibilities[i][j];
    }
  }
}

console.log(max);
