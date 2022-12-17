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

console.log(map);

for (let key in map) {
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
}

console.log(map);


let start = map['AA'];
const minutes = 26;

const memory = {};

const getRateOld = (curPoint, curRate, minutesLeft, visitedPoints) => {
    if (Object.keys(visitedPoints).length === Object.keys(map).length) {
        return curRate;
    }

    if (minutesLeft <= 1) {
        return curRate;
    }

    const memoryKey = `${curPoint.name}-${curRate}-${minutesLeft}-${Object.keys(visitedPoints).join(',')}`;

    if (memory[memoryKey]) {
        return memory[memoryKey];
    }

    let max = 0;
    for (let path in curPoint.paths) {
        if (minutesLeft - 1 - curPoint.paths[path] < 0) {
            continue;
        }

        if (visitedPoints[path]) {
            const r = getRateOld(map[path], curRate, minutesLeft - curPoint.paths[path], { ...visitedPoints });
            max = Math.max(...[r, max]);
            continue;
        }

        const r1 = getRateOld(map[path], (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate,minutesLeft - 1 - curPoint.paths[path], {...visitedPoints, [path]: true});
        const r2 = getRateOld(map[path], curRate, minutesLeft - curPoint.paths[path], { ...visitedPoints });
        max = Math.max(...[r1, r2, max]);
    }

    memory[memoryKey] = max;
    return memory[memoryKey];
};

const getRate = (curPoint, curRate, minutesLeft, visitedPoints, isElef) => {
    if (Object.keys(visitedPoints).length === Object.keys(map).length) {
        return curRate;
    }

    if (minutesLeft <= 1) {
        return curRate;
    }

    let max = 0;
    for (let path in curPoint.paths) {
        if (visitedPoints[path]) {
            continue;
        }
        if (minutesLeft - 1 - curPoint.paths[path] < 0) {
            continue;
        }
        const r1 = getRate(map[path], (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate,minutesLeft - 1 - curPoint.paths[path], {...visitedPoints, [path]: true}, isElef);
        max = isElef ?
            Math.max(...[r1, max]) :
            Math.max(...[
                r1, max,
                (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate + getRateOld(start, 0, 26, {...visitedPoints, [path]: true}, true),
            ]);
    }

    // console.log(max);

    return max;
};

console.log(getRate(start, 0, minutes, {AA: true}, false));