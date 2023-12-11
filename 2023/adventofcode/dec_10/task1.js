const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const sY = lines.findIndex((line) => line.includes('S'));
const sX = lines[sY].indexOf('S');

const queue = [{ x: sX, y: sY, steps: 0 }];
const visitedPoints = new Set([`${sX}-${sY}`]);
let maxSteps = 0;

while (queue.length > 0) {
  const cur = queue.shift();
  maxSteps = Math.max(maxSteps, cur.steps);

  const up = cur.y === 0
    ? undefined : { x: cur.x, y: cur.y - 1, steps: cur.steps + 1 };
  const down = cur.y === lines.length - 1
    ? undefined : { x: cur.x, y: cur.y + 1, steps: cur.steps + 1 };
  const left = cur.x === 0
    ? undefined : { x: cur.x - 1, y: cur.y, steps: cur.steps + 1 };
  const right = cur.x === lines[0].length - 1
    ? undefined : { x: cur.x + 1, y: cur.y, steps: cur.steps + 1 };

  let pointsToAdd = [];
  switch (lines[cur.y][cur.x]) {
    case 'S':
      const upPoint = up && lines[up.y][up.x];
      if (upPoint === '|' || upPoint === '7' || upPoint === 'F') {
        pointsToAdd.push(up);
      }
      const downPoint = down && lines[down.y][down.x];
      if (downPoint === '|' || downPoint === 'L' || downPoint === 'J') {
        pointsToAdd.push(down);
      }
      const leftPoint = left && lines[left.y][left.x];
      if (leftPoint === '-' || leftPoint === 'L' || leftPoint === 'F') {
        pointsToAdd.push(left);
      }
      const rightPoint = right && lines[right.y][right.x];
      if (rightPoint === '-' || rightPoint === 'J' || rightPoint === '7') {
        pointsToAdd.push(right);
      }
      break;
    case 'L':
      pointsToAdd = [up, right];
      break;
    case 'F':
      pointsToAdd = [down, right];
      break;
    case '|':
      pointsToAdd = [up, down];
      break;
    case 'J':
      pointsToAdd = [up, left];
      break;
    case '7':
      pointsToAdd = [down, left];
      break;
    case '-':
      pointsToAdd = [left, right];
      break;
    default:
      break;
  }

  pointsToAdd = pointsToAdd.filter(Boolean).filter((p) => !visitedPoints.has(`${p.x}-${p.y}`));
  pointsToAdd.forEach((p) => { visitedPoints.add(`${p.x}-${p.y}`); queue.push(p); });
}

console.log(maxSteps);
