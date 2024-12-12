const fs = require('fs');

let stones = fs.readFileSync('input.txt', 'utf8').split(' ').reduce((prev, cur) => ({...prev, [cur]: 1}), {});

console.log(stones);

for (let i = 0; i < 25; i++) {
    let nextStones = {};
    for (let key in stones) {
        if (+key === 0) {
            nextStones['1'] = nextStones['1'] ? nextStones['1'] + stones[key] : stones[key];
            continue;
        }
        if (key.length % 2 === 0) {
            const leftKey = `${+(key.slice(0, key.length / 2))}`;
            nextStones[leftKey] = nextStones[leftKey] ? nextStones[leftKey] + stones[key] : stones[key];
            const rightKey = `${+(key.slice(key.length / 2))}`;
            nextStones[rightKey] = nextStones[rightKey] ? nextStones[rightKey] + stones[key] : stones[key];
            continue;
        }

        const newKey = `${+key * 2024}`;
        nextStones[newKey] = nextStones[newKey] ? nextStones[newKey] + stones[key] : stones[key];
    }

    // console.log(nextStones);

    stones = nextStones;
}

console.log(Object.values(stones).reduce((prev, cur) => prev + cur, 0));