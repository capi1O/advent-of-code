#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// > Starting at the top-left corner of your map and following a slope of right 3 and down 1, how many trees would you encounter?

const PATTERN_REPEAT = 100;

const levels = fs.readFileSync(path.resolve(process.cwd(), 'day3.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.map(line => line.repeat(PATTERN_REPEAT)); // string to array of chars (# and .)

// const DOWN_SHIFT = 1;
const LEFT_SHIFT = 3;

let leftShift = 0;
let numberOfTrees = 0;
levels.slice(1) // skip first line
	.forEach(level => {
	leftShift += LEFT_SHIFT;
	if (leftShift > level.length - 1) {
		console.error(`reached right wall`);
		process.exit(1);
	}
	else {
		const char = level.charAt(leftShift);
		console.log(char);
		if (char === '#') numberOfTrees += 1;
	}
});

console.log(`crossed ${numberOfTrees} trees`);
process.exit(0);