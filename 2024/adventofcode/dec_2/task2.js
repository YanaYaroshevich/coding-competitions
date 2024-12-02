const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const run = (levels) => {
    let isIncreasing = levels.length > 1 ? levels[1] > levels[0] : false;
    for (let i = 1; i < levels.length; i++) {
        if (isIncreasing) {
            if (levels[i] < levels[i - 1]) {
                return false;
            }
            if (levels[i] - levels[i - 1] > 3 || levels[i] - levels[i - 1] === 0) {
                return false;
            }
        }
        if (!isIncreasing) {
            if (levels[i] > levels[i - 1]) {
                return false;
            }
            if (levels[i - 1] - levels[i] > 3 || levels[i - 1] - levels[i] === 0) {
                return false;
            }
        }

    }
    return true;
}

const saveCount = lines.reduce((prev, cur) => {
    const levels = cur.split(/\s+/).map(Number);

    if (run(levels)) {
        return prev + 1;
    }

    for (let i = 0; i < levels.length; i++) {
        if (run(levels.slice(0, i).concat(levels.slice(i + 1)))) {
            return prev + 1;
        }
    }
    return prev;
}, 0);

console.log(saveCount);