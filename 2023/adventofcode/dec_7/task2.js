const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const combinationsNum = 7;

const memo = {};

const saveMemoAndReturnRes = (memoKey, res) => {
  memo[memoKey] = res;
  return res;
};

const getCombinationStrength = (hand) => {
  const handMap = {};
  for (let i = 0; i < hand.length; i++) {
    handMap[hand[i]] = handMap[hand[i]] ? handMap[hand[i]] + 1 : 1;
  }
  const memoKey = JSON.stringify(handMap);
  if (memo[memoKey]) {
    return memo[memoKey];
  }

  const jokersCount = handMap.J ?? 0;
  if (jokersCount > 0 && jokersCount < 5) {
    const keys = Object.keys(handMap);
    keys.sort((a, b) => handMap[b] - handMap[a]);
    const biggestKey = keys[0] === 'J' ? keys[1] : keys[0];
    handMap[biggestKey] += jokersCount;
    handMap.J = 0;
  }

  const values = Object.values(handMap);
  if (values.includes(5)) return saveMemoAndReturnRes(memoKey, combinationsNum);
  if (values.includes(4)) return saveMemoAndReturnRes(memoKey, combinationsNum - 1);
  if (values.includes(3) && values.includes(2)) return saveMemoAndReturnRes(memoKey, combinationsNum - 2);
  if (values.includes(3)) return saveMemoAndReturnRes(memoKey, combinationsNum - 3);
  if (values.filter((v) => v === 2).length === 2) return saveMemoAndReturnRes(memoKey, combinationsNum - 4);
  if (values.includes(2)) return saveMemoAndReturnRes(memoKey, combinationsNum - 5);
  return saveMemoAndReturnRes(memoKey, combinationsNum - 6);
};

const cardsMap = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  J: 1,
};

const resArr = lines
  .map((l) => { const tmp = l.split(' '); return { hand: tmp[0], bid: +tmp[1] }; });

resArr.sort((a, b) => {
  const aStrength = getCombinationStrength(a.hand);
  const bStrength = getCombinationStrength(b.hand);

  console.log(a.hand, aStrength);
  console.log(b.hand, bStrength);

  if (aStrength !== bStrength) {
    return aStrength - bStrength;
  }

  for (let i = 0; i < a.hand.length; i++) {
    const aI = cardsMap[a.hand[i]] ?? +a.hand[i];
    const bI = cardsMap[b.hand[i]] ?? +b.hand[i];

    if (aI === bI) continue;
    return aI - bI;
  }
  return 0;
});

// console.log(resArr);
console.log(resArr.reduce((prev, cur, i) => prev + cur.bid * (i + 1), 0));
