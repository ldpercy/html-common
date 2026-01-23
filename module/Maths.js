//
// Maths
//

/** @type {number} */
const TAU = 2 * Math.PI;


/** significantFigures
 * Returns a function that will call toPrecision with the supplied number of significant figures
 * @param {number} integer
 * @return {function}
 */
export function significantFigures(integer) {
	return (number) => { return number.toPrecision(integer) }
}


/** equalToPrecision
 * This won't always do what you want, for example comparing a nearby float to an int `toPrecision` will rarely yield equal.
 * Need better ways of comparing numbers in those circumstances.
 * @param {number} precision
 * @param {number} n1
 * @param {number} n2
 * @return {boolean}
 */
export function equalToPrecision(precision, n1, n2) {
	return (n1.toPrecision(precision) === n2.toPrecision(precision))
}


/** equalToFixed
 * @param {number} digits
 * @param {number} n1
 * @param {number} n2
 * @return {boolean}
 */
export function equalToFixed(digits, n1, n2) {
	//console.log('equalToFixed:',arguments, n1.toFixed(digits), n2.toFixed(digits));
	return (n1.toFixed(digits) === n2.toFixed(digits));
}



//
// geometry
//


/** radiansToDegrees
 * @param {number} radians
 * @return {number}
 */
function radiansToDegrees(radians) {
	return (radians/Math.PI) * 180;
}

/** degreesToRadians
 * @param {number} degrees
 * @return {number}
 */
function degreesToRadians(degrees) {
	return (degrees/180) * Math.PI;
}

/** degreesToRadiansPi
 * @param {number} degrees
 * @return {number}
 */
function degreesToRadiansPi(degrees) {
	return (degrees/180);
}

/** degreesToRadiansTau
 * @param {number} degrees
 * @return {number}
 */
function degreesToRadiansTau(degrees) {
	return (degrees/360);
}

/** degrees180
 * @param {number} degrees
 * @return {number}
 */
export function degrees180(degrees) {
	// https://stackoverflow.com/questions/2320986/easy-way-to-keeping-angles-between-179-and-180-degrees
	// my brain is mushy

	// reduce the angle
	let result = degrees % 360;

	// force it to be the positive remainder, so that 0 <= angle < 360
	result = (result + 360) % 360;

	// force into the minimum absolute value residue class, so that -180 < angle <= 180
	if (result > 180)
		result -= 360;
	return result;
}/* degrees180 */



/** getRandomInt
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function getRandomInt(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

/** getRandomIntInclusive
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function getRandomIntInclusive(min, max) {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}



/** asRomanNumerals
 * @param {number} number
 * @return {string}
 */
export function asRomanNumerals(number) {
	let result = '';
	let value=number, divisor, remainder;
	const rn = [
		{ s: 'm',  v: 1000 },
		{ s: 'cm', v: 900  },
		{ s: 'd',  v: 500  },
		{ s: 'cd', v: 400  },
		{ s: 'c',  v: 100  },
		{ s: 'xc', v: 90   },
		{ s: 'l',  v: 50   },
		{ s: 'xl', v: 40   },
		{ s: 'x',  v: 10   },
		{ s: 'ix', v: 9    },
		{ s: 'v',  v: 5    },
		{ s: 'iv', v: 4    },
		{ s: 'i',  v: 1    },
	];

	for (var j = 0; j < rn.length; j++) {
		divisor = Math.floor(number/rn[j].v);
		result += rn[j].s.repeat(divisor);
		number = number - (divisor * rn[j].v);
		//log(rn[j], divisor,result,number);
	}

	return result
}
