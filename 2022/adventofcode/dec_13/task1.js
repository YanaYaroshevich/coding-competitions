const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

let leftBasicTree = [];
let rightBasicTree = [];

let count = 0;

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

let pairCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!line.trim()) {
    continue;
  }

  if (i % 3 === 0) {
    leftBasicTree = eval(line);
    rightBasicTree = null;
  } else {
    rightBasicTree = eval(line);
  }

  if (leftBasicTree && rightBasicTree) {
    pairCount++;
    if (compareTrees(leftBasicTree, rightBasicTree) === 1) {
      count += pairCount;
    }
  }
}

console.log(count);
