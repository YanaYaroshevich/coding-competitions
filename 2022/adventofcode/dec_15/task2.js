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

    sensors.push({x, y});
    beacons.push({x: x1, y: y1});
}

const map = {};

const logMatr = () => {
    let arr = [];
    let output = '';
    for (let j = miny; j <= maxy; j++) {
        output += `${j < 10 ? '00' : j < 100 ? '0' : ''}${j}`;
        for (let i = minx; i <= maxx; i++) {
            if(j === 0) {
                arr.push(`${i < 10 ? '00' : i < 100 ? '0' : ''}${i}`.split(''));
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
    if (!map[sensors[i].x]) {
        map[sensors[i].x] = {};
    }
    map[sensors[i].x][sensors[i].y] = 'S';
}

for (let i = 0; i < beacons.length; i++) {
    if (!map[beacons[i].x]) {
        map[beacons[i].x] = {};
    }
    map[beacons[i].x][beacons[i].y] = 'B';
}

let options = [];

for (let k = 0; k < sensors.length; k++) {
    console.log('K', k);
    const s = sensors[k];
    const b = beacons[k];

    const dist = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);

    options.push({x: s.x, y: s.y, dist});
}


for (let i = 0; i < 4000000; i++) {
    console.log(i);
    for (let j = 0; j < 4000000; j++) {
        let flag = true;
        for (let k = 0; k < options.length; k++) {
            const opt = options[k];
            if (Math.abs(opt.x - i) + Math.abs(opt.y - j) <= opt.dist) {
                j = opt.dist - Math.abs(opt.x - i) + opt.y;
                flag = false;
                break;
            }
        }
        if (flag) {
            console.log(i, j);
            console.log(i * 4000000 + j);
            return;
        }
    }
}

