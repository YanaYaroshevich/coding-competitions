/*
*

* * */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const map = {};

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const [,name,rate,,,,pathsStr] = line.match(/Valve (\w+) has flow rate=(\d+); (tunnel|tunnels) (lead|leads) to (valve|valves) (.*)/);
    const paths = pathsStr.split(', ').reduce((acc, path) => ({...acc, [path]: 1}), {});

    map[name] = {
        name,
        rate: +rate,
        paths,
    };
}

const findPath = (startPoint, destPoint) => {
    const queue = [{value: startPoint, len: 0}];
    const visitedPoints = {};

    while(queue.length) {
        const curPoint = queue.shift();
        visitedPoints[curPoint.value.name] = true;
        if (curPoint.value.name === destPoint.name) {
            return curPoint.len;
        }
        for (let path in curPoint.value.paths) {
            if (!visitedPoints[path]) {
                queue.push({value: map[path], len: curPoint.value.paths[path] + curPoint.len});
            }
        }
    }
};

for (let key in map) {
    for (let key1 in map) {
        if (key === key1) {
            continue;
        }
        if (!map[key1].paths[key]) {
            const len = findPath(map[key1], map[key]);
            if (len) {
                map[key1].paths[key] = len;
                map[key].paths[key1] = map[key1].paths[key];
            }
        }
    }
}

/* for (let key in map) {
    if (key === 'AA') {
        for (let key1 in map) {
            delete map[key1].paths[key];
        }
        continue;
    }

    if (map[key].rate !== 0) {
        continue;
    }

    delete map[key];

    for (let key1 in map) {
        delete map[key1].paths[key];
    }
} */

console.log(map);


let start = map['AA'];
const minutes = 26;

const memory = {};

const getRate = (curPoint, curRate, minutesLeft, visitedPoints, isElef) => {
    if (Object.keys(visitedPoints).length === lines.length) {
        return curRate;
    }

    if (minutesLeft <= 1) {
        return curRate;
    }

    const memoryKey = `${curRate}${+isElef}${Object.keys(visitedPoints).join('')}`;

    if (memory[curPoint.name] && memory[curPoint.name][minutesLeft] && (memory[curPoint.name][minutesLeft][memoryKey] || memory[curPoint.name][minutesLeft][memoryKey] === 0)) {
        return memory[curPoint.name][minutesLeft][memoryKey];
    }

    let max = 0;
    for (let path in curPoint.paths) {
        /* if (map[path].rate === 0 || visitedPoints[path]) {
            const r = getRate(map[path], curRate,minutesLeft - curPoint.paths[path], {...visitedPoints}, isElef);
            max = isElef ? Math.max(...[r, max]) : Math.max(...[r, max, curRate + getRate(start, 0,  minutes, {...visitedPoints}, true)]);
            continue;
        } */
        if (visitedPoints[path]) {
            continue;
        }
        if (minutesLeft - 1 - curPoint.paths[path] < 0 ) {
            continue;
        }
        const r1 = getRate(map[path], (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate,minutesLeft - 1 - curPoint.paths[path], {...visitedPoints, [path]: true}, isElef);
        // const r2 = getRate(map[path],  curRate,minutesLeft - curPoint.paths[path], { ...visitedPoints }, isElef);
        max = isElef ?
            Math.max(...[r1, max]) :
            Math.max(...[
                r1, max,
                (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate + getRate(start, 0, 26, {...visitedPoints, [path]: true}, true),
            ]);
    }

    if (!memory[curPoint.name]) {
        memory[curPoint.name] = {};
    }
    if (!memory[curPoint.name][minutesLeft]) {
        memory[curPoint.name][minutesLeft] = {};
    }
    memory[curPoint.name][minutesLeft][memoryKey] = max;
    //if (max > 0) {
      //  console.log(memoryKey, max);
    //}

    return memory[curPoint.name][minutesLeft][memoryKey];
};

console.log(getRate(start, 0, minutes, {AA: true}, false));