var fs = require('fs');

var contents = fs.readFileSync('a_example.in', 'utf8');

const lines = contents.split('\n');
const  [R, C, F, N, B, T] = lines[0].split(' ');

lines.shift();
lines.pop();

const rides = lines.map((line) => {
	line = line.split(' ');
	return {
		a: line[0],
		b: line[1],
		x: line[2],
		y: line[3],
		s: line[4],
		f: line[5]
	};
});



console.log();