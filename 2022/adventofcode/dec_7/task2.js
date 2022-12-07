/*
* --- Part Two ---
Now, you're ready to choose a directory to delete.

The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000. You need to find a directory you can delete that will free up enough space to run the update.

In the example above, the total size of the outermost directory (and thus the total amount of used space) is 48381165; this means that the size of the unused space must currently be 21618835, which isn't quite the 30000000 required by the update. Therefore, the update still requires a directory with total size of at least 8381165 to be deleted before it can run.

To achieve this, you have the following options:

Delete directory e, which would increase unused space by 584.
Delete directory a, which would increase unused space by 94853.
Delete directory d, which would increase unused space by 24933642.
Delete directory /, which would increase unused space by 48381165.
Directories e and a are both too small; deleting them would not free up enough space. However, directories d and / are both big enough! Between these, choose the smallest: d, increasing unused space by 24933642.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?

Your puzzle answer was 10096985.
* **/

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');
const currentPath = [];
const filesSystem = {};

const sizesMap = {};

const getLastFolder = () => {
    let j = 0;
    let folder = filesSystem;
    while (j < currentPath.length) {
        folder = folder[currentPath[j]];
        j++;
    }
    return folder;
}


for (let i = 1; i < lines.length; i++) {
    let line = lines[i].includes('$') ? lines[i].substring(1).trim() : lines[i];
    if (line.indexOf('ls') === 0) { continue; }

    if (line.indexOf('dir') === 0) {
        const folder = getLastFolder();
        const folderName = line.split(' ')[1];
        folder[folderName] = folder[folderName] ?? {};
    } else if (line.indexOf('cd') === 0) {
        if (line.includes('..')) {
            currentPath.pop();
        } else {
            const folderName = line.split(' ')[1];
            currentPath.push(folderName);
        }
    }
    else {
        const [size, name] = line.split(' ');
        const folder = getLastFolder();
        folder[name] = +size;
        currentPath.forEach((folderName, i) => {
            const key = currentPath.slice(0, i + 1).join('/');
            sizesMap[key] = sizesMap[key] ? sizesMap[key] + +size : +size;
        });
    }
}

/*console.log(filesSystem);
console.log(sizesMap);*/

const totalSize = 70000000;
const updSize = 30000000;

const totalMemoryTaken = Object.keys(filesSystem).reduce((pr,cur) => pr + (sizesMap[cur] ?? filesSystem[cur]), 0);
console.log(totalMemoryTaken);
const leftSpace = totalSize - totalMemoryTaken;
console.log(leftSpace);

const neededSize = updSize - leftSpace;
const sizesArr = Object.values(sizesMap).sort((a,b) => a - b);

console.log(sizesArr);

for (let i = 0; i < sizesArr.length; i++) {
    if (sizesArr[i] >= neededSize) {
        console.log(sizesArr[i]);
        break;
    }
}