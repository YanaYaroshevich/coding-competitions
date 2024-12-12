const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n').map((el) => el.split('').map(Number));

function findTrail(i, j, current, scoreObj) {
    if (current === 9) {
        if (!visited[`${i},${j}`]) {
            scoreObj.score++;
            visited[`${i},${j}`] = true;
        }
        return;
    }

    if (i > 0 && contents[i - 1][j] === current + 1) {
        findTrail(i - 1, j, current + 1, scoreObj);
    }
    if (i < contents.length - 1 && contents[i + 1][j] === current + 1) {
        findTrail(i + 1, j, current + 1, scoreObj);
    }
    if (j > 0 && contents[i][j - 1] === current + 1) {
        findTrail(i, j - 1, current + 1, scoreObj);
    }
    if (j < contents[i].length - 1 && contents[i][j + 1] === current + 1) {
        findTrail(i, j + 1, current + 1, scoreObj);
    }
}

const scoreObj = { score: 0 };
let visited = {};

for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].length; j++) {
        if (contents[i][j] === 0) {
            findTrail(i, j, 0, scoreObj, visited);
            visited = {};
        }
    }
}

console.log(scoreObj);