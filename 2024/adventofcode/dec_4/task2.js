const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n').map((line) => line.split(''));

const mas = ['A', 'M', 'S'];

function lookForMas(i, j, letterInd, nextPositions) {
    if (!lines[i] || !lines[i][j]) {
        return false;
    }
    if (lines[i][j] !== mas[letterInd]) {
        return false;
    }
    if (letterInd === mas.length - 1) {
        return true;
    }

    return lookForMas(nextPositions[letterInd][0], nextPositions[letterInd][1], letterInd + 1, nextPositions);
}

let count = 0;

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === 'A') {
            const res1 = lookForMas(i, j, 0, [[i - 1, j - 1], [i + 1, j + 1]]);
            const res2 = lookForMas(i, j, 0, [[i - 1, j + 1], [i + 1, j - 1]]);
            const res3 = lookForMas(i, j, 0, [[i + 1, j - 1], [i - 1, j + 1]]);
            const res4 = lookForMas(i, j, 0, [[i + 1, j + 1], [i - 1, j - 1]]);
            if (+res1 + +res2 + +res3 + +res4 === 2) {
                count++;
            }
        }
    }
}

console.log(count);