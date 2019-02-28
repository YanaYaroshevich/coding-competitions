const fs = require('fs');

// const contents = fs.readFileSync('a_example.txt', 'utf8');
const contents = fs.readFileSync('b_lovely_landscapes.txt', 'utf8');
// const contents = fs.readFileSync('c_memorable_moments.txt', 'utf8');
// const contents = fs.readFileSync('d_pet_pictures.txt', 'utf8');
// const contents = fs.readFileSync('e_shiny_selfies.txt', 'utf8');

const lines = contents.split('\n');
const N = +lines[0];
lines.shift();

const photos = [];
let firstP;

for (let i = 0; i < N; i++) {
	const params = lines[i].split(' ');

	if (params[0] === 'V' && !firstP) {
		firstP = {
			id: i,
			orient: params[0],
			tags: params.slice(2)
		};
	} else if (params[0] === 'V' && firstP) {
		let tagMap = {};
		firstP.tags.forEach((t) => {
			tagMap[t] = true;
		});

		const tags2 = params.slice(2);
		tags2.forEach((t) => {
			tagMap[t] = true;
		});

		photos.push({
			id: `${firstP.id} ${i}`,
			orient: 'V',
			tags: Object.keys(tagMap).sort()
		});

		firstP = null;
	} else {
		photos.push({
			id: i,
			orient: params[0],
			tags: params.slice(2).sort()
		});
	}
}

function interest(a, b) {
	let inters = 0;
	let i = 0, j = 0;
	while (i < a.tags.length && j < b.tags.length) {
		if (a.tags[i] === b.tags[j]) {
			inters++;
			i++;
			j++;
		} else if (a.tags[i].localeCompare(b.tags[j]) < 0) {
			i++;
		} else {
			j++;
		}
	}
	return Math.min(inters, a.tags.length - inters, b.tags.length - inters);
}

const queue = [];
let marked = 0;
let component = -1;

const components = [];

do {
	queue.unshift(photos.find((p) => !p.marked));
	component++;

	while (queue.length) {
		let photo = queue.pop();
		photo.marked = true;
		marked++;

		if (components[component]) {
			components[component].push(photo);
		} else {
			components[component] = [photo];
		}

		photos.forEach((p) => {
			if (!p.marked && interest(photo, p)) {
				queue.push(p);
			}
		});
	}
} while (marked < photos.length);

console.log(components);

let totalMax = 0;
let totalPath = [];
let minEdge = Infinity;

const res = [];

components.forEach((comp, ind) => {
	totalMax = 0;
	totalPath = [];
	const matr = [];
	for (let i = 0; i < comp.length; i++) {
		matr.push([]);

		for (let j = 0; j < comp.length; j++) {
			if (i === j) {
				matr[i][j] = -1;
				continue;
			}
			matr[i][j] = interest(comp[i], comp[j]);
		}
	}
	console.log(matr)

	findMaxPath(comp, matr, 0, 0, 0, 0, []);

	const per = totalPath.findIndex((p) => p.interest === minEdge);

	for (let i = per + 1; i < totalPath.length; i++) {
		res.push(`${comp[totalPath[i].i].id}`);
	}
	for (let i = 0; i <= per; i++) {
		res.push(`${comp[totalPath[i].i].id}`);
	}

	console.log(res);
});

function findMaxPath(comp, matr, i, j, level, score, path) {

	const tmp = path.length ? Math.min.apply(this, path.map(p => p.interest)) : 0;
	if (score - tmp > totalMax && path.length === comp.length) {
		totalMax = score;
		totalPath = [...path];
		minEdge = tmp;
		return;
	}

	if (path.length === comp.length) {
		return;
	}

	if (level === matr.length * matr.length) {
		return;
	}

	let iCount = 0, jCount = 0;
	path.forEach((item) => {
		if (item.i === i) {
			iCount++;
		}
		if (item.j === j) {
			jCount++;
		}
	});

	let newI, newJ;

	if (j + 1 === matr.length) {
		newI = i + 1;
		newJ = 0;
	} else {
		newI = i;
		newJ = j + 1;
	}

	if (iCount < 1 && jCount < 1 && j !== i) {
		findMaxPath(comp, matr, newI, newJ, level + 1, score + matr[i][j], [...path, {i, j, interest: matr[i][j]}]);
	}

	findMaxPath(comp, matr, newI, newJ, level + 1, score, path);
}



fs.writeFileSync('b.txt', [res.length, ...res].join('\n'), 'utf8');
