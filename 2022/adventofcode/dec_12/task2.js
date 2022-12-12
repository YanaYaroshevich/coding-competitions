/*
*

* * */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

let start;
const matr = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.indexOf('E') !== -1) {
        start = [i, line.indexOf('E')];
    }

    matr.push([...line.split('').map((el) => ({val: el === 'S' ? 'a'.charCodeAt(0) : (el === 'E' ? 'z'.charCodeAt(0) : el.charCodeAt(0)), visited: false}))]);
}

const stack = [{point: start, moveInd: 0}];
let lastMoveInfo;

while(stack.length) {
    const move = stack.shift();
    const [x, y] = move.point;
    const moveInd = move.moveInd;

    if (matr[x][y].val === 'a'.charCodeAt(0)) {
        lastMoveInfo = move;
        break;
    }

    if (x > 0 && matr[x-1][y].val >= matr[x][y].val - 1 && !matr[x-1][y].visited) {
        stack.push({ point: [x-1, y], moveInd: moveInd + 1 });
        matr[x-1][y].visited = true;
    }

    if (x < matr.length - 1 && matr[x+1][y].val >= matr[x][y].val - 1 && !matr[x+1][y].visited) {
        stack.push({ point: [x+1, y], moveInd: moveInd + 1 });
        matr[x+1][y].visited = true;
    }

    if (y > 0 && matr[x][y-1].val >= matr[x][y].val - 1 && !matr[x][y-1].visited) {
        stack.push({ point: [x, y-1], moveInd: moveInd + 1 });
        matr[x][y-1].visited = true;
    }

    if (y < matr[0].length - 1 && matr[x][y+1].val >= matr[x][y].val - 1 && !matr[x][y+1].visited) {
        stack.push({ point: [x, y+1], moveInd: moveInd + 1 });
        matr[x][y+1].visited = true;
    }
}

console.log(lastMoveInfo);