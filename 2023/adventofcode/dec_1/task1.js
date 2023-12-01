const fs = require("fs");

const contents = fs.readFileSync("input1.txt", "utf8");
const lines = contents.split("\n");

const calibrationNumbers = lines.map((line) => {
    let firstDigit, lastDigit;
    for (let i = 0; i < line.length; i++) {
        const digit = +line[i];
        if (Number.isNaN(digit)) {
            continue;
        }
        if (firstDigit === undefined) {
            firstDigit = digit;
            lastDigit = digit;
            continue;
        }
        lastDigit = digit;
    }

    return `${firstDigit}${lastDigit}`;
});

console.log(calibrationNumbers);

const sum = calibrationNumbers.reduce((prev, cur) => prev + +cur,0);
console.log(sum);