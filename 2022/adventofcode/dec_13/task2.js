const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const leftBasicTree = [];
const rightBasicTree = [];

const compareTrees = (leftTree, rightTree) => {
  let leftSubTree;
  let leftInd = 0;

  let rightSubTree;
  let rightInd = 0;

  while (true) {
    if (leftInd === leftTree.length && rightInd === rightTree.length) {
      if (leftTree === leftBasicTree && rightTree === rightBasicTree) {
        return 1;
      }
      return 0;
    }

    if (leftInd === leftTree.length) {
      return 1;
    }

    if (rightInd === rightTree.length) {
      return -1;
    }

    leftSubTree = leftTree[leftInd];
    rightSubTree = rightTree[rightInd];
    if (typeof leftSubTree === 'number' && typeof rightSubTree === 'number') {
      if (leftSubTree < rightSubTree) {
        return 1;
      } if (leftSubTree > rightSubTree) {
        return -1;
      }
      leftInd++;
      rightInd++;
      continue;
    }

    if (typeof leftSubTree === 'number' && typeof rightSubTree !== 'number') {
      leftSubTree = [leftSubTree];
      const res = compareTrees(leftSubTree, rightSubTree);
      if (res !== 0) {
        return res;
      }
      leftInd++;
      rightInd++;
      continue;
    }

    if (typeof leftSubTree !== 'number' && typeof rightSubTree === 'number') {
      rightSubTree = [rightSubTree];
      const res = compareTrees(leftSubTree, rightSubTree);
      if (res !== 0) {
        return res;
      }
      leftInd++;
      rightInd++;
      continue;
    }

    const res = compareTrees(leftSubTree, rightSubTree);
    if (res !== 0) {
      return res;
    }

    leftInd++;
    rightInd++;
  }
};

const arr = [[[2]], [[6]]];
const d1 = arr[0];
const d2 = arr[1];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!line.trim()) {
    continue;
  }

  if (i % 3 === 0) {
    arr.push(eval(line));
  } else {
    arr.push(eval(line));
  }
}

arr.sort((a, b) => compareTrees(a, b) * (-1));

console.log((arr.indexOf(d1) + 1) * (arr.indexOf(d2) + 1));
