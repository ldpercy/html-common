//
// testing
//

import * as predicateLibrary from './predicate.js';
export { Test }







/* * groupTest
 * @param {string} desc
 * @param {predicateLibrary.Predicate} predicate
 * @param {array} expressionArray
 * /
export function groupTest(desc, predicate, expressionArray) {
	//console.debug(arguments);

	const test = new Test(desc, predicate, expressionArray);
	test.run();

	const consoleStyle = `color:${(test.pass) ? 'green' : 'red'};`  ;

	console.groupCollapsed(`%c [${passFail(test.pass)}] ${desc}`, consoleStyle);
	console.log('predicate:', test.predicate.constructor.name);
	console.dir(test.result);
	console.log(`%c ${passFail(test.pass)}`, consoleStyle);
	console.groupEnd();
}/ * groupTest */


/** @param {boolean} b */
function passFail(b){
	return (b) ? 'pass' : 'fail';
}





/* * testArray
 * @param {function} predicate
 * @param {array} array
 * /
export function testArray(predicate, array) {
	//let result = true;
	console.log('predicate:', predicate.name);

	const result = array.map(
		(element) => {
			const elementResult = {
				result : predicate(element),
				test   : element,
			};

			return elementResult ;
			// if (predicate(element))
			// {
			// 	console.log('true', element);
			// }
			// else {
			// 	console.log('false:', element);
			// }
		}
	);

	console.dir(result);

	return result;
}/ * testArray */






class Test {

	/** @type {string} */ 						desc;
	/** @type {predicateLibrary.Predicate} */	predicate;
	/** @type {Array<any>}*/					expressionArray;
	/** @type {Array<any>} */					#result;
	/**	@type {boolean} */						#pass;


	/**
	 * @param {string} 						desc
	 * @param {predicateLibrary.Predicate} 	predicate
	 * @param {Array<any>}					expressionArray
	 */
	constructor(
			desc = '',
			predicate = new predicateLibrary.NoneFalse(),
			expressionArray=[]) {
		this.desc = desc;
		this.predicate = predicate;
		this.expressionArray = expressionArray;
	}

	get result() { return this.#result; }

	get summary() { return ``}


	run() {
		//console.debug(this.desc,'.run');
		this.#result = this.expressionArray.map(
			(expression) => {

				this.predicate.expression = expression;
				const expressionResult = {
					predicate	: this.predicate.test(),
					expression	: `${expression}`,
				};

				return expressionResult ;
			}
		);
		return this.#result;
	}/* run */

	/** @return {boolean} */
	get pass() {
		const result = this.#result.every(						// this is still a 'none false' condition
			(item) => { return item.predicate === true; }
		);
		return result;
	}


	toConsole() {
		this.run();
		const consoleStyle = `color:${(this.pass) ? 'green' : 'red'};`  ;

		console.group(`%c [${passFail(this.pass)}] ${this.desc}`, consoleStyle);
		console.log('predicate:', this.predicate.constructor.name);
		console.dir(this.result);
		console.log(`%c ${passFail(this.pass)}`, consoleStyle);
		console.groupEnd();

	}/* toConsole */



}/* Test */


