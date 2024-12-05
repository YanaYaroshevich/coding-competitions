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

let sum = 0;

parts[1].split('\n').forEach((line) => {
   const updates = line.split(',');
   let isValid = true;
   for (let i = 0; i < updates.length - 1; i++) {
       if (!isValid) {
           break;
       }

       for (let j = i + 1; j < updates.length; j++) {
           if (rules[updates[i]] && rules[updates[i]].includes(updates[j])) {
               isValid = false;
               break;
           }
       }
   }

   if (isValid) {
       sum += +updates[Math.round((updates.length - 1) / 2)];
   }
});

console.log(sum);