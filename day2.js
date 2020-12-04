#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SLED_RENTAL_PLACE = 'SLED_RENTAL_PLACE';
const OFFICIAL_TOBOGGAN_CORPORATE_POLICY = 'OFFICIAL_TOBOGGAN_CORPORATE_POLICY';

// > Find the two entries that sum to 2020; what do you get if you multiply them together?

const policy = OFFICIAL_TOBOGGAN_CORPORATE_POLICY;

let validPasswords = 0;
fs.readFileSync(path.resolve(process.cwd(), 'day2.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.forEach(line => {

		if (policy === SLED_RENTAL_PLACE) {
			const [match, minNumber, maxNumber, letter, password] = line.match(/^(\d+)-(\d+)\s([a-z]):\s(.+)$/);
		
			const letterCount = password
				.split('') // make array from string (1 character per item)
				.reduce((count, currentLetter) => currentLetter === letter ? count + 1 : count, 0);
	
			if (letterCount >= minNumber && letterCount <= maxNumber) validPasswords += 1;
		}

		else if (policy === OFFICIAL_TOBOGGAN_CORPORATE_POLICY) {
			const [match, firstPositon, secondPositon, letter, password] = line.match(/^(\d+)-(\d+)\s([a-z]):\s(.+)$/);

			const charAtFirstPos = password.charAt(firstPositon - 1) === letter;
			const charAtSecondPos = password.charAt(secondPositon - 1) === letter;

			if (charAtFirstPos ? !charAtSecondPos : charAtSecondPos) validPasswords += 1;
		}

		else {
			console.error(`invalid policy ${policy}`);
			process.exit(1);
		}
	});

console.log(`there are valid ${validPasswords} passwords`);
process.exit(0);

