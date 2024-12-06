const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const linesInit = contents.split('\n');

const guardPos = { i: -1, j: -1 };

for (let i = 0; i < linesInit.length; i++) {
    if (guardPos.i !== -1) {
        break;
    }
    for (let j = 0; j < linesInit[i].length; j++) {
        if (linesInit[i][j] === '^') {
            guardPos.i = i;
            guardPos.j = j;
            break;
        }
    }
}

const run = (lines) => {
    const currentPos = { i: guardPos.i, j: guardPos.j };
    let direction = 'up';
    const map = {};
    let isLoop = false;

    while (currentPos.i >= 0 && currentPos.i < lines.length && currentPos.j >= 0 && currentPos.j < lines[0].length) {
        if (direction === 'up') {
            if (lines[currentPos.i - 1]?.[currentPos.j] === '#') {
                direction = 'right';
                continue;
            }
            currentPos.i--;
        }
        if (direction === 'down') {
            if (lines[currentPos.i + 1]?.[currentPos.j] === '#') {
                direction = 'left';
                continue;
            }
            currentPos.i++;
        }
        if (direction === 'left') {
            if (lines[currentPos.i][currentPos.j - 1] === '#') {
                direction = 'up';
                continue;
            }
            currentPos.j--;
        }
        if (direction === 'right') {
            if (lines[currentPos.i][currentPos.j + 1] === '#') {
                direction = 'down';
                continue;
            }
            currentPos.j++;
        }

        if (map[currentPos.i]?.[currentPos.j] === direction) {
            isLoop = true;
            break;
        }

        if (!map[currentPos.i]) {
            map[currentPos.i] = {};
        }

        map[currentPos.i][currentPos.j] = direction;
    }

    return {map, isLoop};
}

const {map} = run(linesInit);
let count = 0;

Object.keys(map).forEach((i) => {
    Object.keys(map[i]).forEach((j) => {
        if (+i === guardPos.i && +j === guardPos.j) {
            return;
        }

        if (!linesInit[+i]?.[+j]) {
            return;
        }

        const lines = linesInit.map((line) => line.split(''));
        lines[+i][+j] = '#';

        const {isLoop} = run(lines);

        if (isLoop) {
            count++;
        }
    });
});

console.log(count);