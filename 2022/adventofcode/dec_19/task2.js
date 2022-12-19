/*
*

* * */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");
const lines = contents.split("\n");

const minutesCount = 32;

let tmp = 0;
let globalMax = 0;
let id, rbt1, rbt2, rbt3, rbt3cl, rbt4, rbt4obs;

const getGeodes = (minutesPassed, resorces, robots, robotCounts) => {
  if (minutesPassed === minutesCount - 1) {
    robots[3].action(resorces, robotCounts[3]);
    return resorces[3];
  }

  let n = 0;
  if (robotCounts[2] === 0) {
    while (n * n + (robotCounts[1] + 1) * n + resorces[1] - rbt3cl < 0) {
      n++;
    }
  }

  if (-minutesPassed + n >= minutesCount) {
    return 0;
  }

  let m = 0;
  if (robotCounts[3] === 0) {
    while (m * m + (robotCounts[2] + 1) * m + resorces[2] - rbt4obs < 0) {
      m++;
    }
  }

  if (-minutesPassed + n + m >= minutesCount) {
    return 0;
  }

  if (
    ((2 * robotCounts[3] + (minutesCount - minutesPassed - 1 - n - m)) *
      (minutesCount - minutesPassed - n - m)) /
      2 +
      resorces[3] <=
    globalMax
  ) {
    return 0;
  }

  let max = 0;
  for (let i = robots.length - 1; i >= 0; i--) {
    const robot = robots[i];

    if (robot.criteria(resorces)) {
      const resourcesCopy = [...resorces];
      const robotCountsCopy = [...robotCounts];
      robot.buy(resourcesCopy);

      for (let j = 0; j < robots.length; j++) {
        robots[j].action(resourcesCopy, robotCountsCopy[j]);
      }
      robotCountsCopy[i]++;
      max = Math.max(
        ...[
          max,
          getGeodes(minutesPassed + 1, resourcesCopy, robots, robotCountsCopy),
        ]
      );
      globalMax = Math.max(globalMax, max);
    }
  }
  tmp++;
  if (tmp % 1000000 === 0) {
    console.log(tmp);
    // console.log("ROBOTS", robotCounts);
  }

  const resourcesCopy = [...resorces];
  const robotCountsCopy = [...robotCounts];
  for (let j = 0; j < robots.length; j++) {
    robots[j].action(resourcesCopy, robotCountsCopy[j]);
  }
  max = Math.max(
    ...[
      max,
      getGeodes(minutesPassed + 1, resourcesCopy, robots, robotCountsCopy),
    ]
  );
  globalMax = Math.max(globalMax, max);
  return max;
};

let sum = 1;
lines.forEach((line) => {
  [id, rbt1, rbt2, rbt3, rbt3cl, rbt4, rbt4obs] = line.match(/(\d+)/g);

  // ore, clay, obsidian, geode
  const resources = [0, 0, 0, 0];
  const robotCounts = [1, 0, 0, 0];
  const robots = [
    {
      criteria: (resArr) => resArr[0] >= rbt1,
      buy: (resArr) => (resArr[0] -= rbt1),
      action: (resArr, count) => (resArr[0] += count),
    },
    {
      criteria: (resArr) => resArr[0] >= rbt2,
      buy: (resArr) => (resArr[0] -= rbt2),
      action: (resArr, count) => (resArr[1] += count),
    },
    {
      criteria: (resArr) => resArr[0] >= rbt3 && resArr[1] >= rbt3cl,
      buy: (resArr) => {
        resArr[0] -= rbt3;
        resArr[1] -= rbt3cl;
      },
      action: (resArr, count) => (resArr[2] += count),
    },
    {
      criteria: (resArr) => resArr[0] >= rbt4 && resArr[2] >= rbt4obs,
      buy: (resArr) => {
        resArr[0] -= rbt4;
        resArr[2] -= rbt4obs;
      },
      action: (resArr, count) => (resArr[3] += count),
    },
  ];

  globalMax = 0;
  tmp = 0;
  const val = getGeodes(0, [...resources], robots, [...robotCounts]);
  sum *= val;
  console.log(id, val);
});

console.log(sum);
