const fs = require('fs');

// const contents = fs.readFileSync('b_should_be_easy.in', 'utf8');
// const contents = fs.readFileSync('a_example.in', 'utf8');
// const contents = fs.readFileSync('c_no_hurry.in', 'utf8');
const contents = fs.readFileSync('d_metropolis.in', 'utf8');
// const contents = fs.readFileSync('e_high_bonus.in', 'utf8');

const lines = contents.split('\n');
const [R, C, F, N, B, T] = lines[0].split(' ').map(line => +line);

lines.shift();
lines.pop();

const rides = lines.map((line, ind) => {
	line = line.split(' ');
	return {
		a: +line[0],
		b: +line[1],
		x: +line[2],
		y: +line[3],
		s: +line[4],
		f: +line[5],
		ind: ind
	};
});

const answers = [];

let totalCost = 0;

const cars = [];
for (let i = 0; i < F; i++) {
	cars.push({
		xCur: 0,
		yCur: 0,
		tCur: 0,
		ind: i
	});

	answers.push([]);
}

for (let t = 0; t < T; t++) {
	const carsToCheck = cars.filter((car) => {
		return car.tCur === t;
	});

	let max = {
		speed: 0,
		cost: 0,
		time: Infinity
	};

	carsToCheck.forEach((car) => {
		rides.forEach((ride, ind) => {
			const res = cost(car, ride);
			if (res.speed > max.speed || (res.speed === max.speed && res.time < max.time)) {
				max = res;
			}
		});
	});

	if (max.cost === 0) {
		continue;
	}

	max.car.tCur += max.time;
	max.car.xCur = max.ride.x;
	max.car.yCur = max.ride.y;

	totalCost += max.cost;

	answers[max.car.ind].push(max.ride.ind);
	rides.splice(rides.indexOf(max.ride), 1);

	console.log(rides.length)
	t--;
}

fs.writeFileSync('d_metropolis.out', answers.map((ans) => {
	return `${ans.length} ${ans.join(' ')}`;
}).join('\n'), 'utf8');

function cost(car, ride) {
	let cost = 0;
	let time = Math.abs(ride.a - car.xCur) + Math.abs(ride.b - car.yCur);

	if (time + car.tCur <= ride.s) {
		time += ride.s - time - car.tCur;
		cost += B;
	}

	const path = Math.abs(ride.a - ride.x) + Math.abs(ride.b - ride.y);
	time += path;
	cost += path;

	if (time + car.tCur >= ride.f) {
		return {
			time: time,
			cost: 0,
			ride: ride,
			car: car,
			speed: 0
		};
	}

	return {
		time: time,
		cost: cost,
		ride: ride,
		car: car,
		speed: cost / time
	};
}

console.log(totalCost);