const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n').map((line) => line.split(''));

const xmas = ['X', 'M', 'A', 'S'];
const countObj = {count: 0};

function lookForXmas(i, j, letterInd, nextPositions) {
    if (!lines[i] || !lines[i][j]) {
        return countObj;
    }
    if (lines[i][j] !== xmas[letterInd]) {
        return countObj;
    }
    if (letterInd === xmas.length - 1) {
        countObj.count++;
        return countObj;
    }

    lookForXmas(nextPositions[letterInd][0], nextPositions[letterInd][1], letterInd + 1, nextPositions);

    return countObj;
}

// i + 1, i + 2, i + 3
// i - 1, i - 2, i - 3
// j + 1, j + 2, j + 3
// j - 1, j - 2, j - 3
// i + 1, j + 1, i + 2, j + 2, i + 3, j + 3
// i - 1, j - 1, i - 2, j - 2, i - 3, j - 3
// i + 1, j - 1, i + 2, j - 2, i + 3, j - 3
// i - 1, j + 1, i - 2, j + 2, i - 3, j + 3


const nextStepsArr = new Array(xmas.length - 1).fill(0);

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === 'X') {
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i + ind + 1, j]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i - ind - 1, j]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i, j + ind + 1]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i, j - ind - 1]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i + ind + 1, j + ind + 1]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i - ind - 1, j - ind - 1]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i + ind + 1, j - ind - 1]], []));
            lookForXmas(i, j, 0, nextStepsArr.reduce((prev, __, ind) => [...prev, [i - ind - 1, j + ind + 1]], []));
        }
    }
}

console.log(countObj.count);