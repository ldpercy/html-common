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

	/** @returns {boolean} */
	get pass()	{ return this.#pass; }

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
		this.#pass = this.testPasses();
		return this.#result;
	}/* run */




	/** @return {boolean} */
	testPasses() {
		const result = this.#result.every(						// this is still a 'none false' condition
			(item) => { return item.predicate === true; }
		);
		return result;
	}



	toConsole() {
		this.run();
		const consoleStyle = `color:${(this.pass) ? 'green' : 'red'};`  ;
		if (this.pass) {
			console.groupCollapsed(`%c [${passFail(this.pass)}] ${this.desc}`, consoleStyle);
		}
		else{
			console.group(`%c [${passFail(this.pass)}] ${this.desc}`, consoleStyle);
		}

		console.log('predicate:', this.predicate.constructor.name);
		console.dir(this.result);
		console.log(`%c ${passFail(this.pass)}`, consoleStyle);
		console.groupEnd();

	}/* toConsole */


	/**
	 * @param {string} detailsName
	 */
	toHTML(detailsName) {
		let result = `
			<details name="${detailsName}" class="test ${passFail(this.pass)}">
				<summary>${this.desc}</summary>




			</details>
		`;

		return result;
	}


}/* Test */


