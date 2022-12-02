/*
*
* */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

const map = {
    A: 1,
    X: 1, // Rock
    B: 2,
    Y: 2, // Paper
    C: 3,
    Z: 3, // Scissors
};

const mod = (a, b) => {
    const c = a % b
    return (c < 0) ? c + b : c;
}

const myPoints = lines.reduce((acc, line) => {
    const move = line.split(' ');
    let myPoints = map[move[1]];

    if (map[move[0]] === map[move[1]]) {
        myPoints += 3;
    }

    else if (mod(map[move[0]] + 1, 3) === mod(map[move[1]], 3)) {
        myPoints += 6;
    } else {
        myPoints += 0;
    }

    return acc + myPoints;
}, 0);

console.log(myPoints);