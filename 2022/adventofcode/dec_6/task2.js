/*
* --- Part Two ---
* Your device's communication system is correctly detecting packets, but still isn't working. It looks like it also needs to look for messages.
* A start-of-message marker is just like a start-of-packet marker, except it consists of 14 distinct characters rather than 4.
* Here are the first positions of start-of-message markers for all of the above examples:

mjqjpqmgbljsphdztnvjfqwrcgsmlb: first marker after character 19
bvwbjplbgvbhsrlpgdmjqwftvncz: first marker after character 23
nppdvjthqldpwncqszvftbrmjlhg: first marker after character 23
nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg: first marker after character 29
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw: first marker after character 26
*
* How many characters need to be processed before the first start-of-message marker is detected?
* Your puzzle answer was 2260.
* */

const fs = require("fs");

const contents = fs.readFileSync("input.txt", "utf8");

let mapCount = {};
let count = 0;

for (let i = 0; i < contents.length; i++) {
  const lett = contents[i];

  if (!mapCount[lett]) {
    mapCount[lett] = 1;
    count++;
  } else {
    i -= count;
    count = 0;
    mapCount = {};
  }

  if (count === 14) {
    console.log(i + 1);
    break;
  }
}
