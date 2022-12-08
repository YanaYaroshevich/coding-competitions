const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const bothCompItems = [];
let itemsMap = {};

for (const line of lines) {
  const comp1 = line.slice(0, line.length / 2);
  const comp2 = line.slice(line.length / 2);

  for (let i = 0; i < comp1.length; i++) {
    const item = comp1[i];
    itemsMap[item] = 1;
  }

  for (let i = 0; i < comp2.length; i++) {
    const item = comp2[i];
    if (itemsMap[item]) {
      bothCompItems.push(item);
      break;
    }
  }

  itemsMap = {};
}

const aCharCode = "a".charCodeAt(0);
const ACharCode = "A".charCodeAt(0);

const prioritiesSum = bothCompItems.reduce((acc, it) => {
  const code = it.charCodeAt(0);
  if (code >= aCharCode) {
    acc += code - aCharCode + 1;
  } else {
    acc += code - ACharCode + 27;
  }

  return acc;
}, 0);

console.log(prioritiesSum);
