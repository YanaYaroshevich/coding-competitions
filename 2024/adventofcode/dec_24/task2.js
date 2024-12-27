const fs = require('fs');

const swaps = {
  z07: 'bjm',
  bjm: 'z07',
  z13: 'hsw',
  hsw: 'z13',
  z18: 'skf',
  skf: 'z18',
  nvr: 'wkr',
  wkr: 'nvr',
};

const input = fs.readFileSync('input.txt', { encoding: 'utf8' });
let x = 0;
let y = 0;
const wires = input.split('\n\n')[0].split('\n').reduce((obj, line) => {
  const [name, val] = line.split(': ');
  obj[name] = {};
  if (name[0] === 'x') {
    x = Math.max(x, +name.split('x')[1]);
  }
  if (name[0] === 'y') {
    y = Math.max(y, +name.split('y')[1]);
  }
  return obj;
}, {});

const gates = input.split('\n\n')[1].split('\n').reduce((arr, line) => {
  let [part1, out] = line.split(' -> ');

  if (swaps[out]) {
    out = swaps[out];
  }

  const gate = {
    out,
  };
  const [inp1, operation, inp2] = part1.split(' ');

  gate.inp1 = inp1;
  gate.operation = operation;
  gate.inp2 = inp2;

  if (!wires[inp1]) {
    wires[inp1] = {};
  }
  if (!wires[inp2]) {
    wires[inp2] = {};
  }
  if (!wires[out]) {
    wires[out] = {};
  }

  arr.push(gate);
  return arr;
}, []);
const gatesHistory = { 0: {} };
for (let i = 1; i <= x; i++) {
  gatesHistory[i] = {};
  console.log(`i = ${i}:`);
  let oldTemp = gates;

  let oldListToDelete = {};
  for (let j = i + 1; j <= x; j++) {
    const num = j < 10 ? `0${j}` : `${j}`;
    oldListToDelete[`x${num}`] = true;
    oldListToDelete[`y${num}`] = true;
  }
  let listToDelete = {};
  let temp = gates.filter((gate) => {
    if (oldListToDelete[gate.inp1] || oldListToDelete[gate.inp2] || oldListToDelete[gate.out]) {
      listToDelete[gate.out] = true;
      return false;
    }
    return true;
  });
  while (temp.length < oldTemp.length && temp.length) {
    oldTemp = temp;
    oldListToDelete = listToDelete;
    listToDelete = {};
    temp = oldTemp.filter((gate) => {
      if (oldListToDelete[gate.inp1] || oldListToDelete[gate.inp2] || oldListToDelete[gate.out]) {
        listToDelete[gate.out] = true;
        return false;
      }
      return true;
    });
  }

  temp.map((gate) => `${gate.inp1} ${gate.operation} ${gate.inp2} -> ${gate.out}`).forEach((line) => {
    let flag = false;
    for (let j = 0; j < i; j++) {
      if (gatesHistory[j][line]) {
        flag = true;
        break;
      }
    }
    if (!flag) {
      gatesHistory[i][line] = true;
    }
  });
  console.log(Object.keys(gatesHistory[i]).join('\n'));

  if (!checkSum(i, temp)) {
    console.log('ERROR');
    break;
  }
}

console.log(Object.keys(swaps).sort().join(','));

function checkSum(i, gates) {
  const max = 1n << BigInt(i);
  const min = 1n << BigInt(i - 1);
  const interestingNumbers = [max - 1n, min, min - 1n, 0n];
  for (const x of interestingNumbers) {
    for (const y of interestingNumbers) {
      let tempX = x;
      let tempY = y;
      const wires = {};
      for (let p = 0; p <= i; p++) {
        const num = p < 10 ? `0${p}` : `${p}`;
        wires[`x${num}`] = {
          value: tempX % 2n,
        };
        wires[`y${num}`] = {
          value: tempY % 2n,
        };
        tempX /= 2n;
        tempY /= 2n;
      }
      gates.forEach(({ inp1, inp2, out }) => {
        if (!wires[inp1]) {
          wires[inp1] = {};
        }
        if (!wires[inp2]) {
          wires[inp2] = {};
        }
        if (!wires[out]) {
          wires[out] = {};
        }
      });
      const z = getResult(i, wires, gates);
      gates.forEach((gate) => {
        gate.solved = false;
      });
      /* console.log(` ${x.toString(2)}
 ${y.toString(2)}
--------------------------------
${z.toString(2)}`); */
      if (z !== x + y) {
        return false;
      }
    }
  }

  return true;
}

function getResult(i, wires, gates) {
  const result = {};
  for (let j = 0; j <= i; j++) {
    const num = j < 10 ? `0${j}` : `${j}`;
    result[`z${num}`] = true;
  }
  let newGates = gates;
  gates = [];
  while (Object.values(result).some((val) => val) && newGates.length !== gates.length) {
    gates = newGates;
    gates.forEach((gate) => {
      if (wires[gate.inp1].value !== undefined && wires[gate.inp2].value !== undefined) {
        switch (gate.operation) {
          case 'AND':
            wires[gate.out].value = wires[gate.inp1].value && wires[gate.inp2].value ? 1n : 0n;
            break;
          case 'OR':
            wires[gate.out].value = wires[gate.inp1].value || wires[gate.inp2].value ? 1n : 0n;
            break;
          case 'XOR':
            wires[gate.out].value = wires[gate.inp1].value !== wires[gate.inp2].value ? 1n : 0n;
            break;
          default:
            throw Error('OOops!');
            break;
        }

        gate.solved = true;
        if (result[gate.out]) {
          result[gate.out] = false;
        }
      }
    });

    newGates = gates.filter((gate) => !gate.solved);
  }
  if (Object.values(result).some((val) => val)) {
    return -1n;
  }
  const ans = Object.keys(result);
  ans.sort((a, b) => b.localeCompare(a));

  return BigInt(`0b${ans.map((key) => wires[key].value).join('')}`);
}
