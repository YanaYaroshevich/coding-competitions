const fs = require('fs');

const contents = fs.readFileSync('input.txt', 'utf8');

const lines = contents.split('\n');

const run = (nums, res) => {
    if (nums.length === 1) {
        return nums;
    }
    return run(nums.slice(1), res).reduce((prev, cur) => {
        return [...prev, nums[0] + cur, nums[0] * cur, +`${cur}${nums[0]}`];
    }, []).filter((n) => n <= res);
}

let acc = 0;

lines.forEach((line, i) => {
    console.log(i);
    const [res, numsStr] = line.split(':');
    const numArr = numsStr.split(' ').filter((n) => !!n).map((num) => +num).reverse();

    const results = run(numArr, +res);
    if (results.includes(+res)) {
        acc += +res;
    }
})

console.log(acc);