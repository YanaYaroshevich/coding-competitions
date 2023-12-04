const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const map = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const [, name, rate,,,, pathsStr] = line.match(/Valve (\w+) has flow rate=(\d+); (tunnel|tunnels) (lead|leads) to (valve|valves) (.*)/);
  const paths = pathsStr.split(', ');
  console.log(name, rate, paths);

  map[name] = {
    name,
    rate: +rate,
    paths,
  };
}

const start = map.AA;
const minutes = 30;

const memory = {};

const getRate = (curPoint, curRate, minutesLeft, visitedPoints) => {
  if (minutesLeft <= 1) {
    return 0;
  }

  const memoryKey = `${curPoint.name}-${curRate}-${minutesLeft}-${Object.keys(visitedPoints).join(',')}`;

  if (memory[memoryKey]) {
    return memory[memoryKey];
  }

  let max = -Infinity;
  for (let i = 0; i < curPoint.paths.length; i++) {
    const path = curPoint.paths[i];
    if (map[path].rate === 0 || visitedPoints[path]) {
      const r = getRate(map[path], 0, minutesLeft - 1, { ...visitedPoints });
      if (r > max) {
        max = r;
      }
      continue;
    }
    const r1 = getRate(map[path], (map[path].rate * (minutesLeft - 2)), minutesLeft - 2, { ...visitedPoints, [path]: true });
    const r2 = getRate(map[path], 0, minutesLeft - 1, { ...visitedPoints });
    if (r1 > max) {
      max = r1;
    }
    if (r2 > max) {
      max = r2;
    }
  }

  memory[memoryKey] = max < 0 ? curRate : curRate + max;
  return memory[memoryKey];
};

console.log(getRate(start, 0, minutes, { AA: true }));
