/*
*

* * */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const matr = new Array(1000);
let max = -Infinity;

for (let i = 0; i < lines.length; i++) {
    let pairs = lines[i].split(' -> ').map(x => { return x.split(','); });

    for (let j = 1; j < pairs.length; j++) {
        const pair = pairs[j];
        const prevPair = pairs[j - 1];

        if (prevPair[0] !== pair[0]) {
            let start = +prevPair[0] > +pair[0] ? +pair[0] : +prevPair[0];
            let end = +prevPair[0] > +pair[0] ? +prevPair[0] : +pair[0];

            if (+pair[1] > max) {
                max = +pair[1];
            }
            for (let k = start; k <= end; k++) {
                if (!matr[k]) {
                    matr[k] = new Array(1000).fill('.');
                }
                matr[k][+pair[1]] = '#';
            }
            continue;
        }

        if (prevPair[1] !== pair[1]) {
            let start = +prevPair[1] > +pair[1] ? +pair[1] : +prevPair[1];
            let end = +prevPair[1] > +pair[1] ? +prevPair[1] : +pair[1];
            if (end > max) {
                max = end;
            }

            for (let k = start; k <= end; k++) {
                if (!matr[pair[0]]) {
                    matr[pair[0]] = new Array(1000).fill('.');
                }
                matr[pair[0]][k] = '#';
            }
        }
    }
}

const logMatr = () => {
    let arr = [];
    let output = '';
    for (let j = 0; j <= max; j++) {
        output += `${j < 10 ? '00' : j < 100 ? '0' : ''}${j}`;
        for (let i = 0; i < matr.length; i++) {
            if (!matr[i]) {
                continue;
            }
            if(j === 0) {
                arr.push(`${i < 10 ? '00' : i < 100 ? '0' : ''}${i}`.split(''));
            }
            output += matr[i][j];
        }
        output += '\n';
    }
    let str = '';
    for (let j = 0; j < 3; j++) {
        str += '   ';
        for (let i = 0; i < arr.length; i++) {
            str += arr[i][j];
        }
        str += '\n';
    }
    output = str + output;
    console.log(output);
}

logMatr();

let sandX;
let sandY;

for (let i = 1;; i++) {
    sandX = 500;
    sandY = 0;

    while (true) {
        if (sandY >= max) {
            logMatr();
            console.log(i);

            return;
        }

        if (!matr[sandX]) {
            logMatr();
            console.log(i);
            return;
        }

        if (matr[sandX][sandY + 1] === '.') {
            sandY++;
            continue;
        }

        if (matr[sandX][sandY + 1] === 'o' || matr[sandX][sandY + 1] === '#') {
            if (!matr[sandX - 1]) {
                logMatr();
                console.log(i);
                return;
            }

            if (matr[sandX - 1] && matr[sandX - 1][sandY + 1] === '.') {
                sandX--;
                sandY++;
                continue;
            }

            if (!matr[sandX + 1]) {
                logMatr();
                console.log(i);
                return;
            }

            if (matr[sandX + 1] && matr[sandX + 1][sandY + 1] === '.') {
                sandX++;
                sandY++;
                continue;
            }

            matr[sandX][sandY] = 'o';
            logMatr();
            break;
        }
    }
}