const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const run = (levels, isRemoved) => {
    let isIncreasing = levels.length > 1 ? levels[1] > levels[0] : false;
    for (let i = 1; i < levels.length; i++) {
        if (isIncreasing) {
            if (levels[i] < levels[i - 1] || levels[i] - levels[i - 1] > 3 || levels[i] - levels[i - 1] === 0) {
                if (isRemoved) {
                    return false;
                }
                if (!run(levels.slice(0, i).concat(levels.slice(i + 1)), true) && !run(levels.slice(0, i - 1).concat(levels.slice(i)), true)) {
                    return false;
                }
            }
        }
        if (!isIncreasing) {
            if (levels[i] > levels[i - 1] || levels[i - 1] - levels[i] > 3 || levels[i - 1] - levels[i] === 0) {
                if (isRemoved) {
                    return false;
                }
                if (!run(levels.slice(0, i).concat(levels.slice(i + 1)), true) && !run(levels.slice(0, i - 1).concat(levels.slice(i)), true)) {
                    return false;
                }
            }
        }
    }

    return true;
}

const saveCount = lines.reduce((prev, cur) => {
    const levels = cur.split(/\s+/).map(Number);

    return run(levels, false) ? prev + 1 : prev;
}, 0);

console.log(saveCount);