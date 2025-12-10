const fs = require('fs');

const machinesInput = fs.readFileSync('input.txt', 'utf8').split('\n').map((line) => line.split(' '));

const machines = [];
for (const [lights, ...rest] of machinesInput) {
  const buttons = [];
  for (let i = 0; i < rest.length - 1; i++) {
    buttons.push([...rest[i].matchAll(/\d+/g)].reduce((acc, cur) => ({ ...acc, [cur]: true }), {}));
  }

  machines.push({
    buttons,
    lights: [...lights].reduce((acc, x) => {
      if (x === '[' || x === ']') { return acc; }
      acc.push(x === '#' ? 1 : 0);
      return acc;
    }, []),
  });
}

function attemptCombination(buttons, i, lights, isOn, count, answer) {
  if (lights.toString() === answer) {
    return count;
  }
  if (i === buttons.length) {
    return -1;
  }

  const button = buttons[i];
  const newLights = [...lights];
  let newCount = count;
  if (isOn) {
    newCount++;
    for (const key in button) {
      newLights[+key] = newLights[+key] === 0 ? 1 : 0;
    }
  }

  const attempt1 = attemptCombination(buttons, i + 1, newLights, true, newCount, answer);
  const attempt2 = attemptCombination(buttons, i + 1, newLights, false, newCount, answer);
  if (attempt1 !== -1 && attempt2 !== -1) {
    return Math.min(attempt2, attempt1);
  }
  if (attempt1 !== -1) {
    return attempt1;
  }
  return attempt2;
}

let sum = 0;
for (const { buttons, lights } of machines) {
  const emptyLights = lights.map(() => 0);
  const attempt1 = attemptCombination(buttons, 0, emptyLights, true, 0, lights.toString());
  const attempt2 = attemptCombination(buttons, 0, emptyLights, false, 0, lights.toString());
  if (attempt1 !== -1 && attempt2 !== -1) {
    sum += Math.min(attempt1, attempt2);
  } else if (attempt2 !== -1) {
    sum += attempt2;
  } else {
    sum += attempt1;
  }
}

console.log(sum);
