const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

let tokens = 0;

// rulesA[0]x + rulesB[0]y = rulesPrize[0]
// rulesA[1]x + rulesB[1]y = rulesPrize[1]

contents.forEach((input) => {
    const rules = input.split('\n');
    const rulesA = rules[0].match((/\d+/g));
    const rulesB = rules[1].match((/\d+/g));
    const rulesPrize = rules[2].match((/\d+/g)).map((el) => Number(el) + 10000000000000);

    const det = rulesA[0] * rulesB[1] - rulesA[1] * rulesB[0];
    const detX = rulesPrize[0] * rulesB[1] - rulesPrize[1] * rulesB[0];
    const detY = rulesA[0] * rulesPrize[1] - rulesA[1] * rulesPrize[0];

    const x = detX / det;
    const y = detY / det;

    if (!Number.isInteger(x) || !Number.isInteger(y)) {
        return;
    }

    tokens += x * 3 + y;
});

console.log(tokens);
