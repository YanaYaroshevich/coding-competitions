const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

let j = 0;
const stacks = [];

for (let i = 0; i < lines.length; i++) {
    let newLine = lines[i];

    if (isNaN(newLine)) {
        for (let k = 0; k < newLine.length; k++) {
            if (newLine[k] === '[') {
                const ind = Math.floor(k / 4);
                stacks[ind] = stacks[ind] ? [newLine[k + 1], ...stacks[ind]] : [newLine[k + 1]];
                k += 3;
            }
        }
    } else {
        j = i + 1;
        break;
    }
}

for (let i = j; i < lines.length; i++) {
    const [q, from, to] = lines[i].match(/\d+/g);
    stacks[to - 1].push(...stacks[from - 1].slice(stacks[from - 1].length - q ));
    for (let k = 0; k < q; k++) {
        stacks[from - 1].pop();
    }
}

console.log(stacks.map((el) => el.pop()).join(''));