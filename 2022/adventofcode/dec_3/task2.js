const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const badges = [];
let itemsMap = {};

for (let i = 0; i < lines.length; i += 3) {
  for (let j = 0; j < 3; j++) {
    const line = lines[i + j];
    const tmpItemMap = {};
    for (let k = 0; k < line.length; k++) {
      const item = line[k];
      if (!tmpItemMap[item]) {
        tmpItemMap[item] = true;
        itemsMap[item] = itemsMap[item] ? itemsMap[item] + 1 : 1;
      }
    }
  }
  badges.push(Object.keys(itemsMap).find((key) => itemsMap[key] === 3));
  itemsMap = {};
}

console.log(badges);

const aCharCode = "a".charCodeAt(0);
const ACharCode = "A".charCodeAt(0);

const prioritiesSum = badges.reduce((acc, it) => {
  const code = it.charCodeAt(0);
  if (code >= aCharCode) {
    acc += code - aCharCode + 1;
  } else {
    acc += code - ACharCode + 27;
  }

  return acc;
}, 0);

console.log(prioritiesSum);
