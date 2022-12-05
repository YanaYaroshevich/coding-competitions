/*
*--- Part Two ---
* As you watch the crane operator expertly rearrange the crates, you notice the process isn't following your prediction.
* Some mud was covering the writing on the side of the crane, and you quickly wipe it away. The crane isn't a CrateMover 9000 - it's a CrateMover 9001.

* The CrateMover 9001 is notable for many new and exciting features: air conditioning, leather seats, an extra cup holder, and the ability to pick up and move multiple crates at once.
* Again considering the example above, the crates begin in the same configuration:

    [D]
[N] [C]
[Z] [M] [P]
 1   2   3

* Moving a single crate from stack 2 to stack 1 behaves the same as before:

[D]
[N] [C]
[Z] [M] [P]
 1   2   3

* However, the action of moving three crates from stack 1 to stack 3 means that those three moved crates stay in the same order, resulting in this new configuration:

        [D]
        [N]
    [C] [Z]
    [M] [P]
 1   2   3

* Next, as both crates are moved from stack 2 to stack 1, they retain their order as well:

        [D]
        [N]
[C]     [Z]
[M]     [P]
 1   2   3

* Finally, a single crate is still moved from stack 1 to stack 2, but now it's crate C that gets moved:

        [D]
        [N]
        [Z]
[M] [C] [P]
 1   2   3

* In this example, the CrateMover 9001 has put the crates in a totally different order: MCD.
* Before the rearrangement process finishes, update your simulation so that the Elves know where they should stand to be ready to unload the final supplies. After the rearrangement procedure completes, what crate ends up on top of each stack?
* Your puzzle answer was TZLTLWRNF.
* */

const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');
const lines = contents.split('\n');

let j = 0;
const stacks = [];

for (let i = 0; i < lines.length; i++) {
    let newLine = lines[i];

    if (isNaN(newLine)) {
        for (let k = 0; k < newLine.length; k++) {
            if (newLine[k] === '[') {
                const ind = Math.floor(k / 4);
                stacks[ind] = stacks[ind] ? [newLine[k + 1], ...stacks[ind]] : [newLine[k + 1]];
                k += 3;
            }
        }
    } else {
        j = i + 1;
        break;
    }
}

for (let i = j; i < lines.length; i++) {
    const [q, from, to] = lines[i].match(/\d+/g);
    stacks[to - 1].push(...stacks[from - 1].slice(stacks[from - 1].length - q ));
    for (let k = 0; k < q; k++) {
        stacks[from - 1].pop();
    }
}

console.log(stacks.map((el) => el.pop()).join(''));