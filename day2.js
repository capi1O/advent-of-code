#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// > Find the two entries that sum to 2020; what do you get if you multiply them together?

let validPasswords = 0;
fs.readFileSync(path.resolve(process.cwd(), 'day2.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.forEach(line => {
		const [match, minNumber, maxNumber, letter, password] = line.match(/^(\d+)-(\d+)\s([a-z]):\s(.+)$/);
		
		const letterCount = password
			.split('') // make array from string (1 character per item)
			.reduce((count, currentLetter) => currentLetter === letter ? count + 1 : count, 0);

		if (letterCount >= minNumber && letterCount <= maxNumber) validPasswords += 1;
	});

console.log(`there are valid ${validPasswords} passwords`);

