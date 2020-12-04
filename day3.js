#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// > Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

const PATTERN_REPEAT = 100;

const levels = fs.readFileSync(path.resolve(process.cwd(), 'day3.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.map(line => line.repeat(PATTERN_REPEAT)); // repeat line multiple times on right

const countTreesOnSlope = (RIGHT_SHIFT, DOWN_SHIFT) => {
	let rightShift = 0;
	let numberOfTrees = 0;
	for (let level = DOWN_SHIFT; level < levels.length; level += DOWN_SHIFT) { // skip first lines

		const levelLine = levels[level];
		rightShift += RIGHT_SHIFT;

		if (rightShift > levelLine.length - 1) {
			console.error('reached right wall');
			process.exit(1);
		}
		else {
			const char = levelLine.charAt(rightShift);
			if (char === '#') numberOfTrees += 1;
		}
	}

	console.log(`crossed ${numberOfTrees} trees on slope Right ${RIGHT_SHIFT}, Down ${DOWN_SHIFT}`);

	return numberOfTrees;
};

const slopes = [
	{ right: 1, down: 1 },
	{ right: 3, down: 1 },
	{ right: 5, down: 1 },
	{ right: 7, down: 1 },
	{ right: 1, down: 2 }
];

const result = slopes.map(({ right, down }) => countTreesOnSlope(right, down))
	.reduce((acc, curr) => acc * curr, 1);

console.log(result);

process.exit(0);