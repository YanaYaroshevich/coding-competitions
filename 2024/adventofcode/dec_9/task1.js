const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

let finalStr = [];

for (let i = 0; i < contents.length; i++) {
    if (i % 2 === 0) {
        const id = i / 2;
        for (let j = 0; j < +contents[i]; j++) {
            finalStr.push(id);
        }
    } else {
        for (let j = 0; j < +contents[i]; j++) {
            finalStr.push('.');
        }
    }
}

let i = 0;
let j = finalStr.length - 1;
while (i < j) {
    if (finalStr[i] !== '.') {
        i++;
        continue;
    }
    if (finalStr[j] === '.') {
        j--;
        continue;
    }
    if (finalStr[j] !== '.') {
       finalStr[i] = finalStr[j];
       finalStr[j] = '.';
       j--;
       i++;
    }
}

const checksum = finalStr.reduce((prev, el, i) => {
    if (el === '.') {
        return prev;
    }
    return prev + el * i;
}, 0);

console.log(checksum);