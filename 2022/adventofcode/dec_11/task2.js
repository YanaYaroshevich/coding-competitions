const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');
const nok = BigInt(17 * 7 * 13 * 2 * 19 * 3 * 5 * 11);

const monkeysState = {};
let curMonkey = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('Monkey')) {
    [, curMonkey] = line.replace(/:/g, '').split(' ');
    if (!monkeysState[curMonkey]) {
      monkeysState[curMonkey] = { itemsWorryLevels: [], test: {}, inspectedItems: 0 };
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
  }

  if (line.includes('Test')) {
    const num = line.replace(/Test: divisible by/g, '').trim();
    monkeysState[curMonkey].test.criteria = +num;
    const monkey1 = lines[i + 1].replace(/If true: throw to monkey/g, '').trim();
    monkeysState[curMonkey].test.trueMonkey = monkey1;
    const monkey2 = lines[i + 2].replace(/If false: throw to monkey/g, '').trim();
    monkeysState[curMonkey].test.falseMonkey = monkey2;
    i += 2;
  }
}

monkeysState[0].operation = (old) => (BigInt(old) * BigInt(5)) % nok;
monkeysState[1].operation = (old) => (BigInt(old) + BigInt(3)) % nok;
monkeysState[2].operation = (old) => (BigInt(old) + BigInt(7)) % nok;
monkeysState[3].operation = (old) => (BigInt(old) + BigInt(5)) % nok;
monkeysState[4].operation = (old) => (BigInt(old) + BigInt(2)) % nok;
monkeysState[5].operation = (old) => (BigInt(old) * BigInt(19)) % nok;
monkeysState[6].operation = (old) => (BigInt(old) * BigInt(old)) % nok;
monkeysState[7].operation = (old) => (BigInt(old) + BigInt(4)) % nok;

for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < Object.values(monkeysState).length; j++) {
    const monkey = monkeysState[j];

    for (let k = 0; k < monkey.itemsWorryLevels.length; k++) {
      const item = monkey.itemsWorryLevels[k];
      const worryLevel = monkey.operation(item);
      if (BigInt(worryLevel) % BigInt(monkey.test.criteria) === 0n) {
        monkeysState[monkey.test.trueMonkey].itemsWorryLevels.push(worryLevel);
      } else {
        monkeysState[monkey.test.falseMonkey].itemsWorryLevels.push(worryLevel);
      }
    }
    monkey.inspectedItems += monkey.itemsWorryLevels.length;
    monkey.itemsWorryLevels = [];
  }
  console.log(i);
}

const arr = Object.values(monkeysState).map((el) => el.inspectedItems);
arr.sort((a, b) => b - a);

console.log(arr);
console.log(arr[0] * arr[1]);
