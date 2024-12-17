const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8').split('\n\n');

// Parse input and initialize registers B and C to 0
let [_, b, c] = contents[0].split('\n').map((line) => BigInt(line.match(/\d+/g)[0]));

const program = contents[1].match(/\d+/g).map((n) => BigInt(n));

// Helper function to resolve combo operands
function resolveComboOperand(operand, a, b, c) {
  switch (operand) {
    case 0n: case 1n: case 2n: case 3n:
      return operand;
    case 4n:
      return a;
    case 5n:
      return b;
    case 6n:
      return c;
    default:
      throw new Error(`Invalid combo operand: ${operand}`);
  }
}

// Function to execute the program with a given initial value of A
function runProgram(initialA) {
  let a = BigInt(initialA);
  let ip = 0n;
  const output = [];

  while (ip < program.length) {
    const opcode = program[ip];
    const operand = program[ip + 1n];

    switch (opcode) {
      case 0n: // adv
        a /= (2n ** resolveComboOperand(operand, a, b, c));
        break;

      case 1n: // bxl
        b ^= operand;
        break;

      case 2n: // bst
        b = resolveComboOperand(operand, a, b, c) % 8n;
        break;

      case 3n: // jnz
        if (a !== 0n) {
          ip = operand;
          continue;
        }
        break;

      case 4n: // bxc
        b ^= c;
        break;

      case 5n: // out
        output.push(resolveComboOperand(operand, a, b, c) % 8n);
        break;

      case 6n: // bdv
        b = a / (2n ** resolveComboOperand(operand, a, b, c));
        break;

      case 7n: // cdv
        c = a / (2n ** resolveComboOperand(operand, a, b, c));
        break;

      default:
        throw new Error(`Unknown opcode: ${opcode}`);
    }

    ip += 2n;
  }

  return output;
}

let targetA = 300000000000000n;

while (true) {
  const output = runProgram(targetA);

  if (targetA % 1000n === 0n) {
    console.log(targetA);
  }

  if (
    output.length === program.length
      && output.every((v, i) => v === program[Number(i)])
  ) {
    console.log(`Lowest positive initial value for register A: ${targetA}`);
    break;
  }

  targetA++;
}
