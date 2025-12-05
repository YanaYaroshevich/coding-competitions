const fs = require('fs');

const [rangesStr, ingredientsStr] = fs.readFileSync('input.txt', 'utf8').split(/\n\n/);

const ranges = rangesStr.split('\n').map((row) => row.split('-').map(Number));

function mergeRanges(ranges) {
  ranges.sort((a, b) => a[0] - b[0]);

  const result = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const [start, end] = ranges[i];
    const last = result[result.length - 1];

    if (start <= last[1]) {
      last[1] = Math.max(last[1], end);
    } else {
      result.push([start, end]);
    }
  }

  return result;
}

const mergedRanges = mergeRanges(ranges);

console.log(mergedRanges);

const ingredients = ingredientsStr.split('\n').map(Number);

let count = 0;
ingredients.forEach((ingredient) => {
  for (let i = 0; i < mergedRanges.length; i++) {
    if (mergedRanges[i][0] <= ingredient && ingredient <= mergedRanges[i][1]) {
      count++;
      return;
    }
  }
});

console.log(count);
