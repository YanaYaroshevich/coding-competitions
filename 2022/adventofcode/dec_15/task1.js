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

  sensors.push({ x, y });
  beacons.push({ x: x1, y: y1 });
}

const map = {};

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

// logMatr();

const y = 2000000;
let count = 0;

for (let k = 0; k < sensors.length; k++) {
  console.log('K', k);
  const s = sensors[k];
  const b = beacons[k];

  const dist = Math.abs(s.x - b.x) + Math.abs(s.y - b.y);

  for (let i = s.x - dist; i <= s.x + dist; i++) {
    if (Math.abs(s.y - y) + Math.abs(s.x - i) > dist) {
      continue;
    }

    if (!map[i]) {
      map[i] = {};
    }
    if (map[i][y]) {
      continue;
    }
    map[i][y] = '#';
    count++;
  }
  // logMatr();
}

console.log(count);
