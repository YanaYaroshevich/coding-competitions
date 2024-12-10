const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const lines = contents.split('\n');

const map = {};

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '.') {
            continue;
        }
        if (!map[lines[i][j]]) {
            map[lines[i][j]] = [];
        }
        map[lines[i][j]].push([i, j]);
    }
}

// a - 3,4, 5,5
// diffI = -2, diffJ = -1
// # - 1,3  7,6

// i#1 - i1 = diffI
// j#1 - j1 = diffJ

// i#1 = diffI + i1 = 1
// j#1 = diffJ + j1 = 3

// i#2 = -diffI + i2 = 7
// j#2 = -diffJ + j2 = 6

const hashCoords = {};
const keys = Object.keys(map);

for (const key of keys) {
    const coords = map[key];

    for (let i = 0; i < coords.length - 1; i++) {
        for (let j = i + 1; j < coords.length; j++) {
            const [i1, j1] = coords[i];
            const [i2, j2] = coords[j];

            const diffI = i1 - i2;
            const diffJ = j1 - j2;

            let k = 0;

            while (true) {
                let continueFlag = true;
                const i3 = k * diffI + i1;
                const j3 = k * diffJ + j1;

                if (i3 >= 0 && i3 < lines.length && j3 >= 0 && j3 < lines[0].length) {
                    if (!hashCoords[i3]) {
                        hashCoords[i3] = {};
                    }
                    hashCoords[i3][j3] = true;
                } else {
                    continueFlag = false;
                }

                const i4 = k * (-diffI) + i2;
                const j4 = k * (-diffJ) + j2;

                if (i4 >= 0 && i4 < lines.length && j4 >= 0 && j4 < lines[0].length) {
                    if (!hashCoords[i4]) {
                        hashCoords[i4] = {};
                    }
                    hashCoords[i4][j4] = true;
                } else if (!continueFlag) {
                    break;
                }
                k++;
            }
        }
    }
}

console.log(Object.keys(hashCoords).reduce((prev, cur) => {
    return prev + Object.keys(hashCoords[cur]).length;
}, 0));