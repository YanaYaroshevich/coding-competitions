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
    const paths = pathsStr.split(', ');

    console.log(name, rate, paths);

    map[name] = {
        name,
        rate: +rate,
        paths,
    };
}

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

    const memoryKey = `${curPoint.name}-${minutesLeft}-${isElef}-${Object.keys(visitedPoints).join(',')}`;

    if (memory[memoryKey] || memory[memoryKey] === 0) {
        return memory[memoryKey];
    }

    let max = 0;
    for (let i = 0; i < curPoint.paths.length; i++) {
        const path = curPoint.paths[i];
        if (map[path].rate === 0 || visitedPoints[path]) {
            const r = getRate(map[path], curRate,minutesLeft - 1, {...visitedPoints}, isElef);
            max = isElef ? Math.max(...[r, max]) : Math.max(...[r, max, curRate + getRate(start, 0,  minutes, {...visitedPoints}, true)]);
            continue;
        }
        const r1 = getRate(map[path], (map[path].rate * (minutesLeft - 2)) + curRate,minutesLeft - 2, {...visitedPoints, [path]: true}, isElef);
        const r2 = getRate(map[path],  curRate,minutesLeft - 1, { ...visitedPoints }, isElef);
        max = isElef ?
            Math.max(...[r1, r2, max]) :
            Math.max(...[
                r1, r2, max,
                (map[path].rate * (minutesLeft - 2)) + curRate + getRate(start, 0, 26, {...visitedPoints, [path]: true}, true),
                // curRate + getRate(start, 0, 26, {...visitedPoints}, true),
            ]);
    }

    memory[memoryKey] = max;
    //if (max > 0) {
        console.log(memoryKey, max);
    //}

    return memory[memoryKey];
};

console.log(getRate(start, 0, minutes, {AA: true}, false));