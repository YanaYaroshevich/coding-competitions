const fs = require('fs');

const rows = 103;
const cols = 101;

const matrix = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

const robots = [];
contents.forEach((line) => {
    const parsed = line.match(/-?\d+/g).map(Number);
    robots.push({ position: { i: parsed[1], j: parsed[0] }, velocity: { i: parsed[3], j: parsed[2] } });
    matrix[parsed[1]][parsed[0]]++;
});

let i =0;

while(true) {
    for (let robot of robots) {
        matrix[robot.position.i][robot.position.j]--;

        const updatedRows = robot.position.i + robot.velocity.i;
        if (updatedRows >= rows) {
            robot.position.i = updatedRows % rows;
        } else if (updatedRows < 0) {
            robot.position.i = rows + updatedRows;
        } else {
            robot.position.i = updatedRows;
        }

        const updatedColumns = robot.position.j + robot.velocity.j;
        if (updatedColumns >= cols) {
            robot.position.j = updatedColumns % cols;
        } else if (updatedColumns < 0) {
            robot.position.j = cols + updatedColumns;
        } else {
            robot.position.j = updatedColumns;
        }

        matrix[robot.position.i][robot.position.j]++;
    }

    i++;

    let countInTheMiddle = 0;
    for (let robot of robots) {
        if (robot.position.i > rows / 4 && robot.position.i < 3 * rows / 4 && robot.position.j > cols / 4 && robot.position.j < 3 * cols / 4) {
            countInTheMiddle++;
        }
    }

    if (countInTheMiddle >= 250) {
        break;
    }
}

console.log(matrix.map((el) => el.join('')));
console.log(i);
