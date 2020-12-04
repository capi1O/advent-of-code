#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const requiredFields = [
	'ecl',
	'pid',
	'eyr',
	'hcl',
	'byr',
	'iyr',
	// 'cid', //CID is optional
	'hgt',
];

// Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?

(async function() {

	// 1. read file
	const puzzle = await fs.promises.readFile(path.resolve(process.cwd(), 'day4.txt'));

	// 2. separate passport data by blank line
	// > Passports are separated by blank lines.
	const passports = puzzle.toString('utf8').split('\n\n'); // split(/(\n\r){2,}/g);

	// 3. check number of valid passports
	let validPassports = 0;
	passports.forEach(passportData => {

		// 3A. make the passport dict from line
		// > Each passport is represented as a sequence of key:value pairs separated by spaces or newlines.
		const passportKeyValues = passportData.split(/[\s\n]+/);
		const passportDict = passportKeyValues.reduce((accumulator, keyValue) => {
			const [key, value] = keyValue.split(':');
			if (key !== '') accumulator[key] = value;
			return accumulator;
		}, {});
		// console.log(passportDict);

		// 3B. check if all required fields are present in object
		if (requiredFields.every(field => field in passportDict)) {

			// 3C. for all fields check if data is valid

			// byr
			if (/^\d\d\d\d$/.test(passportDict.byr)) {
				const byr = parseInt(passportDict.byr);
				if (byr < 1920 || byr > 2020) return;
			}
			else return;

			// iyr
			if (/^\d\d\d\d$/.test(passportDict.iyr)) {
				const iyr = parseInt(passportDict.iyr);
				if (iyr < 2010 || iyr > 2020) return;
			}
			else return;

			// eyr
			if (/^\d\d\d\d$/.test(passportDict.eyr)) {
				const eyr = parseInt(passportDict.eyr);
				if (eyr < 2020 || eyr > 2030) return;
			}
			else return;

			// hgt
			if (/^\d+cm/.test(passportDict.hgt)) {
				const hgt = parseInt(passportDict.hgt.match(/^(\d+)cm/)[1]);
				if (hgt < 150 || hgt > 193) return;
			}
			else if (/^\d+in$/.test(passportDict.hgt)) {
				const hgt = parseInt(passportDict.hgt.match(/^(\d+)in/)[1]);
				if (hgt < 59 || hgt > 76) return;
			}
			else return;

			// hcl
			if (!/^#[0-9a-f]{6}$/.test(passportDict.hcl)) return;

			// ecl
			if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passportDict.ecl)) return;

			// pid
			if (!/^\d{9}$/.test(passportDict.pid)) return;

			validPassports += 1;
		}
	})
	console.log(`there are ${validPassports} valid passports`);
}());