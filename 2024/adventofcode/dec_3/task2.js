const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const doRegexp = /do\(\)/g;
const dontRegexp = /don't\(\)/g;
const regexp = /mul\(\d{1,3},\d{1,3}\)/g;

const matches = [...contents.matchAll(regexp)].map((match) => ({matches: match[0].match(/\d{1,3}/g), index: match.index}));
const dos = [...contents.matchAll(doRegexp)].map((match) => match.index);
const donts = [...contents.matchAll(dontRegexp)].map((match) => match.index);

dos.sort((a, b) => a - b)
donts.sort((a, b) => a - b)

let result = 0;
for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    let doIndex = dos.findLast((doIndex) => doIndex <= match.index);
    let dontIndex = donts.findLast((dontIndex) => dontIndex <= match.index);

    if (doIndex === undefined) {
        doIndex = -1;
    }
    if (dontIndex === undefined) {
        dontIndex = -1;
    }

    if (doIndex < dontIndex) {
        continue;
    }

    result += match.matches.reduce((prev, cur) => prev * cur, 1);
}

console.log(result);