const fs = require('fs');

const redCoords = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(',').reverse().map(Number));

const verticalBorders = [];
const horizontalBorders = [];
for (let i = 0; i < redCoords.length; i++) {
  const j = i === redCoords.length - 1 ? 0 : i + 1;
  const prev = i === 0 ? redCoords.length - 1 : i - 1;
  const next = j < redCoords.length - 1 ? j + 1 : 1;

  if (redCoords[i][0] === redCoords[j][0]) {
    const start = redCoords[i][1] < redCoords[j][1] ? redCoords[i][1] : redCoords[j][1];
    const end = start === redCoords[i][1] ? redCoords[j][1] : redCoords[i][1];
    horizontalBorders.push({
      startJ: start,
      endJ: end,
      i: redCoords[j][0],
      isTouching: redCoords[prev][0] - redCoords[i][0] > 0 ? !(redCoords[j][0] > redCoords[next][0]) : redCoords[j][0] > redCoords[next][0],
    });
  }
  if (redCoords[i][1] === redCoords[j][1]) {
    const start = redCoords[i][0] < redCoords[j][0] ? redCoords[i][0] : redCoords[j][0];
    const end = start === redCoords[i][0] ? redCoords[j][0] : redCoords[i][0];
    verticalBorders.push({
      startI: start,
      endI: end,
      j: redCoords[j][1],
      isTouching: redCoords[prev][1] - redCoords[i][1] > 0 ? !(redCoords[j][1] > redCoords[next][1]) : redCoords[j][1] > redCoords[next][1],
    });
  }
}

console.log(verticalBorders);
console.log(horizontalBorders);

function getArea(point1, point2) {
  return (Math.abs(point1[0] - point2[0]) + 1) * (Math.abs(point1[1] - point2[1]) + 1);
}

let maxArea = 0;
for (let i = 0; i < redCoords.length - 1; i++) {
  console.log(`i = ${i}`);
  for (let j = i + 1; j < redCoords.length; j++) {
    if (i === j) continue;

    if (j % 100 === 0) {
      console.log(`j = ${j}`);
    }

    const newArea = getArea(redCoords[i], redCoords[j]);
    if (newArea <= maxArea) continue;

    const iMin = redCoords[i][0] <= redCoords[j][0] ? redCoords[i][0] : redCoords[j][0];
    const iMax = redCoords[i][0] <= redCoords[j][0] ? redCoords[j][0] : redCoords[i][0];
    const jMin = redCoords[i][1] <= redCoords[j][1] ? redCoords[i][1] : redCoords[j][1];
    const jMax = redCoords[i][1] <= redCoords[j][1] ? redCoords[j][1] : redCoords[i][1];

    let toContinue = false;
    for (const red of redCoords) {
      if (red[0] > iMin && red[0] < iMax && red[1] > jMin && red[1] < jMax) {
        toContinue = true;
        break;
      }
    }

    if (toContinue) {
      continue;
    }

    let flag = false;
    for (let k = iMin; (k <= iMax) && !flag; k += Math.max(iMax - iMin, 1)) {
      for (let l = jMin; (l <= jMax) && !flag; l++) {
        let left = 0; let right = 0; let top = 0; let
          bottom = 0;

        let isBorder = false;

        for (const {
          startI, endI, j, isTouching,
        } of verticalBorders) {
          if (startI <= k && k <= endI) {
            if (l > j) {
              left++;
            }
            if (l < j) {
              right++;
            }
            if (l === j) {
              isBorder = true;
              break;
            }
          }
          if (j === l && !isTouching) {
            if (startI < k && endI < k) {
              top++;
            }
            if (startI > k && endI > k) {
              bottom++;
            }
          }
        }

        if (isBorder) {
          continue;
        }

        for (const {
          startJ, endJ, i, isTouching,
        } of horizontalBorders) {
          if (startJ <= l && l <= endJ) {
            if (k > i) {
              top++;
            }
            if (k < i) {
              bottom++;
            }
            if (k === i) {
              isBorder = true;
              break;
            }
          }
          if (i === k && !isTouching) {
            if (startJ < l && endJ < l) {
              left++;
            }
            if (startJ > l && endJ > l) {
              right++;
            }
          }
        }

        if (isBorder) {
          continue;
        }

        if (top % 2 === 0 || bottom % 2 === 0 || left % 2 === 0 || right % 2 === 0) {
          flag = true;
        }
      }
    }

    for (let k = iMin; (k <= iMax) && !flag; k++) {
      for (let l = jMin; (l <= jMax) && !flag; l += Math.max(jMax - jMin, 1)) {
        let left = 0; let right = 0; let top = 0; let
          bottom = 0;

        let isBorder = false;

        for (const {
          startI, endI, j, isTouching,
        } of verticalBorders) {
          if (startI <= k && k <= endI) {
            if (l > j) {
              left++;
            }
            if (l < j) {
              right++;
            }
            if (l === j) {
              isBorder = true;
              break;
            }
          }
          if (j === l && !isTouching) {
            if (startI < k && endI < k) {
              top++;
            }
            if (startI > k && endI > k) {
              bottom++;
            }
          }
        }

        if (isBorder) {
          continue;
        }

        for (const {
          startJ, endJ, i, isTouching,
        } of horizontalBorders) {
          if (startJ <= l && l <= endJ) {
            if (k > i) {
              top++;
            }
            if (k < i) {
              bottom++;
            }
            if (k === i) {
              isBorder = true;
              break;
            }
          }
          if (i === k && !isTouching) {
            if (startJ < l && endJ < l) {
              left++;
            }
            if (startJ > l && endJ > l) {
              right++;
            }
          }
        }

        if (isBorder) {
          continue;
        }

        if (top % 2 === 0 || bottom % 2 === 0 || left % 2 === 0 || right % 2 === 0) {
          flag = true;
        }
      }
    }

    if (!flag) {
      maxArea = newArea;
    }
  }
}

console.log(maxArea);
