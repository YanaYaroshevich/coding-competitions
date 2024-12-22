const fs = require('fs');

const codes = fs.readFileSync('input.txt', 'utf8').split('\n');

const keysArr = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], [null, '0', 'A']];
const arrowsArr = [[null, '^', 'A'], ['<', 'v', '>']];

function createMap(arr) {
  return arr.reduce((prev, cur, i) => ({
    ...prev,
    ...cur.reduce((prev1, symb, j) => {
      if (!symb) {
        return prev1;
      }
      return {
        ...prev1, [symb]: { i, j },
      };
    }, {}),
  }), {});
}

const keys = createMap(keysArr);
const arrows = createMap(arrowsArr);

const memo = {};

function findShortestPathLength(code, isKeys, robots) {
  if (robots === 0) {
    return code.length;
  }
  if (memo[code]?.[robots]) {
    return memo[code][robots];
  }
  const map = isKeys ? keys : arrows;
  const arr = isKeys ? keysArr : arrowsArr;
  let start = map.A;
  let pushes = 0;
  const codeArr = code.split('');

  for (const symb of codeArr) {
    const end = map[symb];
    const queue = [{ ...start, code: '' }];
    let min = Infinity;

    while (queue.length) {
      const { i, j, code } = queue.shift();

      if (i === end.i && j === end.j) {
        min = Math.min(min, findShortestPathLength(`${code}A`, false, robots - 1));
      }

      if (end.i > i && arr[i + 1][j] !== null) {
        queue.push({ i: i + 1, j, code: `${code}v` });
      }
      if (end.j > j && arr[i][j + 1] !== null) {
        queue.push({ i, j: j + 1, code: `${code}>` });
      }
      if (end.i < i && arr[i - 1][j] !== null) {
        queue.push({ i: i - 1, j, code: `${code}^` });
      }
      if (end.j < j && arr[i][j - 1] !== null) {
        queue.push({ i, j: j - 1, code: `${code}<` });
      }
    }

    pushes += min;
    start = end;
  }

  if (!memo[code]) {
    memo[code] = {};
  }
  memo[code][robots] = pushes;
  return pushes;
}

let res = 0;
codes.forEach((code) => {
  const shortestPathLength = findShortestPathLength(code, true, 26);
  const codeNum = parseInt(code, 10);

  console.log(shortestPathLength);
  console.log(codeNum);

  res += codeNum * shortestPathLength;
});

console.log(res);
