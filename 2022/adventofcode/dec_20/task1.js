/*
*

* * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

console.log("TOTAL ", lines.length);

let touchedIndexes = {};
const nums = lines.map(Number);

for (let i = 0; i < nums.length; i++) {
  if (touchedIndexes[i]) continue;
  if (nums[i] === 0) {
    touchedIndexes[i] = true;
    console.log(nums.join(" "));
    continue;
  }
  const num = nums[i];

  const newIndex =
    (i + num <= 0
      ? nums.length - 1 + (i + num)
      : i + num > nums.length - 1
      ? i + num + 1
      : i + num) % nums.length;
  nums.splice(i, 1);
  nums.splice(newIndex, 0, num);

  console.log(nums.join(" "));

  const newTouchedIndexes = {};

  for (let key in touchedIndexes) {
    let newKey = key;
    if (+key < i && newIndex <= +key) {
      delete touchedIndexes[key];
      newKey = +key + 1;
    } else if (+key > i && newIndex >= +key) {
      delete touchedIndexes[key];
      newKey = +key - 1;
    }
    newTouchedIndexes[newKey] = true;
  }
  newTouchedIndexes[newIndex] = true;

  touchedIndexes = newTouchedIndexes;

  console.log(Object.keys(touchedIndexes).length);
  i--;
}

console.log(nums.join(" "));

const i = nums.indexOf(0);

const num1 = nums[(i + 1000) % nums.length];
const num2 = nums[(i + 2000) % nums.length];
const num3 = nums[(i + 3000) % nums.length];

console.log(num1, num2, num3);

console.log(num1 + num2 + num3);
