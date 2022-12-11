/*
*

* * */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const monkeysState = {};
let curMonkey = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('Monkey')) {
    [, curMonkey] = line.replace(/:/g, '').split(' ');
    if (!monkeysState[curMonkey]) {
      monkeysState[curMonkey] = {itemsWorryLevels: [], test: {}, inspectedItems: 0};
    }
    continue;
  }

  if (line.includes('Starting items')) {
    const [, items] = line.split(':');
    monkeysState[curMonkey].itemsWorryLevels.push(...items.split(', ').map(Number));
  }

  if (line.includes('Operation')) {
    let [, operation] = line.split(':');
    operation = operation.replace(/new = /g, '');
    monkeysState[curMonkey].operation = (old) => { return eval(operation.replace(/old/g, old)); };
  }

  if (line.includes('Test')) {
    let num = line.replace(/Test: divisible by/g, '').trim();
    monkeysState[curMonkey].test.criteria = +num;
    const monkey1 = lines[i+1].replace(/If true: throw to monkey/g, '').trim();
    monkeysState[curMonkey].test.trueMonkey = monkey1;
    const monkey2 = lines[i+2].replace(/If false: throw to monkey/g, '').trim();
    monkeysState[curMonkey].test.falseMonkey = monkey2;
    i += 2;
  }
}

console.log(monkeysState[0].operation(79));

for (let i = 0; i < 20; i++) {
  for (let j = 0; j < Object.values(monkeysState).length; j++) {
    const monkey = monkeysState[j];

    for (let k = 0; k < monkey.itemsWorryLevels.length; k++) {
      const item = monkey.itemsWorryLevels[k];
      let worryLevel = monkey.operation(item);
      worryLevel = Math.floor(worryLevel / 3);
      if (worryLevel % monkey.test.criteria === 0) {
        monkeysState[monkey.test.trueMonkey].itemsWorryLevels.push(worryLevel);
      } else {
        monkeysState[monkey.test.falseMonkey].itemsWorryLevels.push(worryLevel);
      }
    }
    monkey.inspectedItems += monkey.itemsWorryLevels.length;
    monkey.itemsWorryLevels = [];
  }
}

const arr = Object.values(monkeysState);
arr.sort(( a, b ) => b.inspectedItems - a.inspectedItems);

console.log(arr);
console.log(arr[0].inspectedItems * arr[1].inspectedItems);