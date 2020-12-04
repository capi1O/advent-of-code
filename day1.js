#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// > Find the two entries that sum to 2020; what do you get if you multiply them together?

const numbers =  fs.readFileSync(path.resolve(process.cwd(), 'day1.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.map(stringNumber => parseInt(stringNumber));

let number1, number2;

numbers.every((num1, idx1) => {
	const remainingNumbersToTry = numbers.slice(idx1 + 1);

	remainingNumbersToTry.every(num2 => {
		if (num1 + num2 == 2020) {
			number1 = num1;
			number2 = num2;
			return false; // break the loop
		}
		else return true; // continue
	});

	if (number1 && number2) return false; // break the loop
	else return true; // continue
});

console.log(`${number1} + ${number2} = 2020`);
console.log(`${number1} * ${number2} = ${number1 * number2}`);
