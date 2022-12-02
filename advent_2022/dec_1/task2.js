/*
* --- Part Two ---
* By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually run out of snacks.
* To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the top three Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.
* In the example above, the top three Elves are the fourth Elf (with 24000 Calories), then the third Elf (with 11000 Calories), then the fifth Elf (with 10000 Calories). The sum of the Calories carried by these three elves is 45000.
* Find the top three Elves carrying the most Calories. How many Calories are those Elves carrying in total?
* Your puzzle answer was 211447.
* */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const maxArr = [];
let count = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 0 && !Number.isNaN(lines[i])) {
        maxArr[count] = +maxArr[count] ?  +maxArr[count] + +lines[i] : +lines[i];
    } else {
        count++;
    }
}

maxArr.sort((a, b) => b - a);

console.log(maxArr[0] + maxArr[1] + maxArr[2]);