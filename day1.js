#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// > Find the two entries that sum to 2020; what do you get if you multiply them together?

const numbers =  fs.readFileSync(path.resolve(process.cwd(), 'day1.txt'))
	.toString('utf8')
	.split('\n')
	.filter(string => string !== '') // filter empty lines
	.map(stringNumber => parseInt(stringNumber));

let number1, number2, number3;

numbers.every((num1, idx1) => {

	const remainingNumbersToTry1 = numbers.slice(idx1 + 1);
	remainingNumbersToTry1.every((num2, idx2) => {

		const remainingNumbersToTry2 = numbers.slice(idx2 + 1);
		remainingNumbersToTry2.every(num3 => {

			if (num1 + num2 + num3 == 2020) {
				number1 = num1;
				number2 = num2;
				number3 = num3;
				return false; // break the loop
			}
			else return true; // continue
		});

		if (number1 && number2 && number3) return false; // break the loop
		else return true; // continue
	});

	if (number1 && number2 && number3) return false; // break the loop
	else return true; // continue
});

console.log(`${number1} + ${number2} + ${number3} = 2020`);
console.log(`${number1} x ${number2} x ${number3}  = ${number1 * number2 * number3}`);
