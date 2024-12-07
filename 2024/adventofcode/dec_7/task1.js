const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const lines = contents.split('\n');

const run = (nums) => {
    if (nums.length === 1) {
        return nums;
    }
    return run(nums.slice(1)).reduce((prev, cur) => {
        return [...prev, nums[0] + cur, nums[0] * cur];
    }, []);
}

let acc = 0;

lines.forEach((line) => {
    const [res, numsStr] = line.split(':');
    const numArr = numsStr.split(' ').filter((n) => !!n).map((num) => +num).reverse();

    const results = run(numArr);
    if (results.includes(+res)) {
        acc += +res;
    }
})

console.log(acc);