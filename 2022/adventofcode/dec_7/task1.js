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
};

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].includes('$') ? lines[i].substring(1).trim() : lines[i];
  if (line.indexOf('ls') === 0) {
    continue;
  }

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
  } else {
    const [size, name] = line.split(' ');
    const folder = getLastFolder();
    folder[name] = +size;
    currentPath.forEach((folderName, i) => {
      const key = currentPath.slice(0, i + 1).join('/');
      sizesMap[key] = sizesMap[key] ? sizesMap[key] + +size : +size;
    });
  }
}

console.log(filesSystem);
console.log(sizesMap);

const smallDirs = Object.keys(sizesMap).filter((d) => sizesMap[d] <= 100000);
console.log(smallDirs);

console.log(smallDirs.reduce((pr, cur) => pr + sizesMap[cur], 0));
