const fs = require('fs');

const contents = fs.readFileSync('input1.txt', 'utf8');
const lines = contents.split('\n');

const combinationsNum = 7;

const getCombinationStrength = (hand) => {
  const handMap = {};
  for (let i = 0; i < hand.length; i++) {
    handMap[hand[i]] = handMap[hand[i]] ? handMap[hand[i]] + 1 : 1;
  }
  const values = Object.values(handMap);
  if (values.includes(5)) return combinationsNum;
  if (values.includes(4)) return combinationsNum - 1;
  if (values.includes(3) && values.includes(2)) return combinationsNum - 2;
  if (values.includes(3)) return combinationsNum - 3;
  if (values.filter((v) => v === 2).length === 2) return combinationsNum - 4;
  if (values.includes(2)) return combinationsNum - 5;
  return combinationsNum - 6;
};

const cardsMap = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
};

const resArr = lines
  .map((l) => { const tmp = l.split(' '); return { hand: tmp[0], bid: +tmp[1] }; });

resArr.sort((a, b) => {
  const aStrength = getCombinationStrength(a.hand);
  const bStrength = getCombinationStrength(b.hand);

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
