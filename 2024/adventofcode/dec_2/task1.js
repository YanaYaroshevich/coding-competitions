const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const saveCount = lines.reduce((prev, cur) => {
    const levels = cur.split(/\s+/).map(Number);
    let isIncreasing = levels.length > 1 ? levels[1] > levels[0] : false;
    for (let i = 1; i < levels.length; i++) {
        if (isIncreasing) {
            if (levels[i] < levels[i - 1]) {
                return prev;
            }
            if (levels[i] - levels[i - 1] > 3 || levels[i] - levels[i - 1] === 0) {
                return prev;
            }
        }
        if (!isIncreasing) {
            if (levels[i] > levels[i - 1]) {
                return prev;
            }
            if (levels[i - 1] - levels[i] > 3 || levels[i - 1] - levels[i] === 0) {
                return prev;
            }
        }
    }
    return prev + 1;
}, 0);

console.log(saveCount);