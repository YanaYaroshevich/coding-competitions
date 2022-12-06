/*

* */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

let mapCount = {};
let count = 0;

for (let i = 0; i < contents.length; i++) {
    const lett = contents[i];

    if (!mapCount[lett]) {
        mapCount[lett] = 1;
        count++;
    } else {
        i -= count;
        count = 0;
        mapCount = {};
    }

    if (count === 4) {
        console.log(i + 1);
        break;
    }
}
