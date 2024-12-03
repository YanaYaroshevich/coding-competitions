const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
const result = contents.match(regexp).reduce((prev, cur) => {
    return prev + cur.match(/\d{1,3}/g).reduce((prev, cur) => prev * cur, 1);
}, 0);

console.log(result);