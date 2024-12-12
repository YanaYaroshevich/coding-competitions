const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n');

function findRegion(i, j, obj) {
    if (visited[i]?.[j]) {
        return;
    }

    if (!visited[i]) {
        visited[i] = {};
    }
    visited[i][j] = true;
    obj.region++;

    if (contents[i][j] !== contents[i - 1]?.[j] && contents[i][j] !== contents[i]?.[j - 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] !== contents[i + 1]?.[j] && contents[i][j] !== contents[i]?.[j - 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] !== contents[i - 1]?.[j] && contents[i][j] !== contents[i]?.[j + 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] !== contents[i + 1]?.[j] && contents[i][j] !== contents[i]?.[j + 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] === contents[i - 1]?.[j] && contents[i][j] === contents[i]?.[j + 1] && contents[i][j] !== contents[i - 1]?.[j + 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] === contents[i + 1]?.[j] && contents[i][j] === contents[i]?.[j + 1] && contents[i][j] !== contents[i + 1]?.[j + 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] === contents[i - 1]?.[j] && contents[i][j] === contents[i]?.[j - 1] && contents[i][j] !== contents[i - 1]?.[j - 1]) {
        obj.perimeter++;
    }
    if (contents[i][j] === contents[i + 1]?.[j] && contents[i][j] === contents[i]?.[j - 1] && contents[i][j] !== contents[i + 1]?.[j - 1]) {
        obj.perimeter++;
    }

    if (i > 0 && contents[i - 1][j] === contents[i][j]) {
        findRegion(i - 1, j, obj);
    }
    if (i < contents.length - 1 && contents[i + 1][j] === contents[i][j]) {
        findRegion(i + 1, j, obj);
    }
    if (j > 0 && contents[i][j - 1] === contents[i][j]) {
        findRegion(i, j - 1, obj);
    }
    if (j < contents[i].length - 1 && contents[i][j + 1] === contents[i][j]) {
        findRegion(i, j + 1, obj);
    }
}

const visited = {};
let sum = 0;

for (let i = 0; i < contents.length; i++) {
    for (let j = 0; j < contents[i].length; j++) {
        if (visited[i]?.[j]) {
            continue;
        }
        const obj = { region: 0, perimeter: 0};
        findRegion(i, j, obj);
        sum += obj.region * obj.perimeter;
    }
}

console.log(sum);