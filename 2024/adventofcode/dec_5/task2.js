const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const parts = contents.split('\n\n');
const rules = parts[0].split('\n').reduce((prev, cur) => {
    const [bef, aft] = cur.split('|');
    if (!prev[aft]) {
        prev[aft] = [];
    }
    prev[aft].push(bef);
    return prev;
}, {});

const notValidUpdates = [];

parts[1].split('\n').forEach((line) => {
    const updates = line.split(',');
    for (let i = 0; i < updates.length - 1; i++) {
        for (let j = i + 1; j < updates.length; j++) {
            if (rules[updates[i]] && rules[updates[i]].includes(updates[j])) {
                notValidUpdates.push(updates);
                return;
            }
        }
    }
});

notValidUpdates.forEach((updates) => {
    for (let i = 0; i < updates.length - 1; i++) {
        for (let j = i + 1; j < updates.length; j++) {
            if (rules[updates[i]] && rules[updates[i]].includes(updates[j])) {
                const temp = updates[j];
                updates.splice(j, 1);
                updates.splice(i, 0, temp);
                i = 0;
                break;
            }
        }
    }
});

let sum = 0;
notValidUpdates.forEach((updates) => {
    sum += +updates[Math.round((updates.length - 1) / 2)];
});

console.log(sum);