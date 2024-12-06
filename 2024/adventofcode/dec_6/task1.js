const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const lines = contents.split('\n');

const guardPos = { i: -1, j: -1 };

for (let i = 0; i < lines.length; i++) {
    if (guardPos.i !== -1) {
        break;
    }
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '^') {
            guardPos.i = i;
            guardPos.j = j;
            break;
        }
    }
}

const currentPos = { i: guardPos.i, j: guardPos.j };
let direction = 'up';

const map = {[currentPos.i]: {[currentPos.j]: true}};

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

    if (!map[currentPos.i]) {
        map[currentPos.i] = {};
    }
    map[currentPos.i][currentPos.j] = true;
}

const count = Object.keys(map).reduce((prev, cur) => {
    return prev + Object.keys(map[cur]).length;
}, 0);

console.log(count - 1);