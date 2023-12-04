const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const map = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [, name, rate,,,, pathsStr] = line.match(/Valve (\w+) has flow rate=(\d+); (tunnel|tunnels) (lead|leads) to (valve|valves) (.*)/);
  const paths = pathsStr.split(', ').reduce((acc, path) => ({ ...acc, [path]: 1 }), {});

  map[name] = {
    name,
    rate: +rate,
    paths,
  };
}

const findPath = (startPoint, destPoint) => {
  const queue = [{ value: startPoint, len: 0 }];
  const visitedPoints = {};

  while (queue.length) {
    const curPoint = queue.shift();
    visitedPoints[curPoint.value.name] = true;
    if (curPoint.value.name === destPoint.name) {
      return curPoint.len;
    }
    for (const path in curPoint.value.paths) {
      if (!visitedPoints[path]) {
        queue.push({ value: map[path], len: curPoint.len + 1 });
      }
    }
  }
};

const graph = {};

for (const key in map) {
  for (const key1 in map) {
    if (key === key1) {
      continue;
    }

    const len = findPath(map[key1], map[key]);
    if (len) {
      if (!graph[key1]) {
        graph[key1] = { paths: {} };
      }
      graph[key1].paths[key] = len;
    }
  }
}

for (const key in map) {
  map[key].paths = graph[key].paths;
}

for (const key in map) {
  if (key === 'AA') {
    for (const key1 in map) {
      delete map[key1].paths[key];
    }
    continue;
  }

  if (map[key].rate !== 0) {
    continue;
  }

  delete map[key];

  for (const key1 in map) {
    delete map[key1].paths[key];
  }
}

console.log(map);

const start = map.AA;
const minutes = 26;

const getRate = (curPoint, curRate, minutesLeft, visitedPoints, isElef) => {
  if (Object.keys(visitedPoints).length === Object.keys(map).length) {
    return curRate;
  }

  if (minutesLeft <= 1) {
    return curRate;
  }

  let max = curRate;
  for (const path in curPoint.paths) {
    if (visitedPoints[path]) {
      continue;
    }
    if (minutesLeft - 1 - curPoint.paths[path] < 0) {
      continue;
    }
    const r1 = getRate(map[path], (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate, minutesLeft - 1 - curPoint.paths[path], { ...visitedPoints, [path]: true }, isElef);
    max = isElef
      ? Math.max(...[r1, max])
      : Math.max(...[
        r1, max,
        (map[path].rate * (minutesLeft - 1 - curPoint.paths[path])) + curRate + getRate(start, 0, minutes, { ...visitedPoints, [path]: true }, true),
      ]);
  }

  console.log(JSON.stringify(visitedPoints), max);

  return max;
};

console.log(getRate(start, 0, minutes, { AA: true }, false));
