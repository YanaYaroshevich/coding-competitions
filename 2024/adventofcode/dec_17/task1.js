const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

let [a, b, c] = contents[0].split('\n').map((line) => +line.match(/\d+/g)[0]);

const program = contents[1].match(/\d+/g).map(Number);

const output = [];
let ip = 0;

function resolveComboOperand(operand) {
  switch (operand) {
    case 0: case 1: case 2: case 3:
      return operand;
    case 4:
      return a;
    case 5:
      return b;
    case 6:
      return c;
    default:
      throw new Error(`Invalid combo operand: ${operand}`); // Shouldn't reach here
  }
}

while (ip < program.length) {
  const opcode = program[ip];
  const operand = program[ip + 1];

  switch (opcode) {
    case 0: // adv
      a = Math.floor(a / (2 ** resolveComboOperand(operand)));
      break;

    case 1: // bxl
      b ^= operand;
      break;

    case 2: // bst
      b = resolveComboOperand(operand) % 8;
      break;

    case 3: // jnz
      if (a !== 0) {
        ip = operand;
        continue; // Skip IP increment
      }
      break;

    case 4: // bxc
      b ^= c;
      break;

    case 5: // out
      output.push(resolveComboOperand(operand) % 8);
      break;

    case 6: // bdv
      b = Math.floor(a / (2 ** resolveComboOperand(operand)));
      break;

    case 7: // cdv
      c = Math.floor(a / (2 ** resolveComboOperand(operand)));
      break;

    default:
      throw new Error(`Unknown opcode: ${opcode}`);
  }

  ip += 2; // Move to the next instruction
}

console.log(output.join(','));
