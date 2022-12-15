/*
*

* * */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const sensors = [];
const beacons = [];



let minx = Infinity;
let miny = Infinity;
let maxx = -Infinity;
let maxy = -Infinity;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [x, y, x1, y1] = line.match(/(-)?\d+/g).map(Number);
    if (x > maxx) {
        maxx = x;
    }
    if (x1 > maxx) {
        maxx = x1;
    }
    if (x < minx) {
        minx = x;
    }
    if (x1 < minx) {
        minx = x1;
    }
    if (y > maxy) {
        maxy = y;
    }
    if (y1 > maxy) {
        maxy = y1;
    }
    if (y < miny) {
        miny = y;
    }
    if (y1 < miny) {
        miny = y1;
    }
    sensors.push([x, y]);
    beacons.push([x1, y1]);
}

let minxAbs = Math.abs(minx - 150);
let minyAbs = Math.abs(miny - 150);

const maxxAbs = maxx + minxAbs;
const maxyAbs = maxy + minyAbs;

const map = new Array(maxxAbs + 1);


const logMatr = () => {
    let arr = [];
    let output = '';
    for (let j = 0; j <= maxyAbs; j++) {
        const outputi = Math.abs(j - minyAbs);
        output += `${outputi < 10 ? '00' : outputi < 100 ? '0' : ''}${outputi}`;
        for (let i = 0; i <= maxxAbs; i++) {
            if(j === 0) {
                const outputi = Math.abs(i - minxAbs);
                arr.push(`${outputi < 10 ? '00' : outputi < 100 ? '0' : ''}${outputi}`.split(''));
            }
            if (!map[i]) {
                output += '.';
                continue;
            }
            output += map[i][j] ?? '.';
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

for (let i = 0; i < sensors.length; i++) {
    if (!map[sensors[i][0] + minxAbs]) {
        map[sensors[i][0] + minxAbs] = new Array(maxyAbs + 1);
    }
    map[sensors[i][0] + minxAbs][sensors[i][1] + minyAbs] = 'S';
}

for (let i = 0; i < beacons.length; i++) {
    if (!map[beacons[i][0] + minxAbs]) {
        map[beacons[i][0] + minxAbs] = new Array(maxyAbs + 1);
    }
    map[beacons[i][0] + minxAbs][beacons[i][1] + minyAbs] = 'B';
}

// logMatr();

for (let k = 0; k < sensors.length; k++) {
    const s = sensors[k];
    const b = beacons[k];

    const dist = Math.abs(s[0] - b[0]) + Math.abs(s[1] - b[1]);

    for (let i = -dist; i <= dist; i++) {
        for (let j = -dist; j <= dist; j++) {
            if (i + j > dist || i + j < -dist || i - j > dist || i - j < -dist) {
                continue;
            }
            if (!map[s[0] + minxAbs + i]) {
                map[s[0] + minxAbs + i] = new Array(maxyAbs + 1);
            }
            if (map[s[0] + minxAbs + i][s[1] + minyAbs + j]) {
                continue;
            }
            map[s[0] + minxAbs + i][s[1] + minyAbs + j] = '#';
        }
    }
    // logMatr();
}

let count = 0;
for (let j = 0; j <= maxyAbs; j++) {
    for (let i = 0; i <= maxxAbs; i++) {
        if (!map[i]) {
            continue;
        }
        if (j - minyAbs === 10 && map[i][j] === '#') {
            count++;
        }
    }
}

console.log(count);