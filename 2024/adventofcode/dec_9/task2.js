const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

let finalStr = [];

const spaceMap = {};

for (let i = 0; i < contents.length; i++) {
    if (i % 2 === 0) {
        const id = i / 2;
        for (let j = 0; j < +contents[i]; j++) {
            finalStr.push(id);
        }
    } else {
        spaceMap[finalStr.length] = +contents[i];
        for (let j = 0; j < +contents[i]; j++) {
            finalStr.push('.');
        }
    }
}

const movedFiles = [];

let j = finalStr.length - 1;
while (j >= 0) {
    if (finalStr[j] === '.') {
        j--;
        continue;
    }
    if (finalStr[j] !== '.') {
        const lastJ = j;
        while (finalStr[j] === finalStr[lastJ]) {
            j--;
        }
        const fileLength = lastJ - j;

        if (movedFiles.includes(finalStr[lastJ])) {
            continue;
        }

        movedFiles.push(finalStr[lastJ]);

        const keys = Object.keys(spaceMap).sort((a, b) => a - b);

        for (const key of keys) {
            if (spaceMap[key] >= fileLength && +key <= j) {
                for (let k = +key; k < +key + fileLength; k++) {
                    finalStr[k] = finalStr[lastJ];
                }
                for (let k = j + 1; k <= lastJ; k++) {
                    finalStr[k] = '.';
                }
                const newKey = +key + fileLength;
                spaceMap[newKey] = spaceMap[key] - fileLength;
                delete spaceMap[key];
                break;
            }
        }
    }
}

console.log(finalStr.join(''))

const checksum = finalStr.reduce((prev, el, i) => {
    if (el === '.') {
        return prev;
    }
    return prev + el * i;
}, 0);

console.log(checksum);
