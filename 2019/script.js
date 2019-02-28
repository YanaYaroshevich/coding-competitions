const fs = require('fs');

const contents = fs.readFileSync('a_example.txt', 'utf8');
// const contents = fs.readFileSync('b_lovely_landscapes.txt', 'utf8');
// const contents = fs.readFileSync('c_memorable_moments.txt', 'utf8');


const lines = contents.split('\n');
const N = +lines[0];
lines.shift();

const photos = [];

for (let i = 0; i < N; i++) {
	const params = lines[i].split(' ');
	photos.push({
		id: i,
		orient: params[0],
		tags: params.slice(2)
	});
}

console.log(photos);

/* fs.writeFileSync('d_metropolis.out', answers.map((ans) => {
	return `${ans.length} ${ans.join(' ')}`;
}).join('\n'), 'utf8'); */

