/*
*

* * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

console.log("TOTAL ", lines.length);

const numsCopy = lines.map(Number);
const nums = lines.map((num, index) => ({ val: +num, index }));

for (let i = 0; i < numsCopy.length; i++) {
  if (numsCopy[i] === 0) {
    continue;
  }

  const num = numsCopy[i];
  const iSwapped = nums.findIndex(({ index }) => index === i);

  let adding = 0;
  if (iSwapped + num < 0) {
    while (adding + (iSwapped + num) < 0) {
      adding += nums.length - 1;
    }
  }
  if (iSwapped + num > nums.length - 1) {
    while (adding + (iSwapped + num) > nums.length - 1) {
      adding -= nums.length - 1;
    }
  }

  const newIndex = (adding + iSwapped + num) % nums.length;

  const numObj = nums[iSwapped];
  nums.splice(iSwapped, 1);
  nums.splice(newIndex, 0, numObj);

  // console.log(nums.map((n) => n.val).join(" "));
}

console.log(nums.join(" "));

const i = nums.findIndex((v) => v.val === 0);

const num1 = nums[(i + 1000) % nums.length].val;
const num2 = nums[(i + 2000) % nums.length].val;
const num3 = nums[(i + 3000) % nums.length].val;

console.log(num1, num2, num3);

console.log(num1 + num2 + num3);
