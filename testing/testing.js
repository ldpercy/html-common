//
// testing
//

import * as predicateLibrary from './predicate.js';
export { Test }






/**
 * @param {boolean} b
 * @returns {string}
 */
function passFail(b){
	return (b) ? 'pass' : 'fail';
}



/**
 * @param {boolean} b
 * @returns {string}
 */
function tickCross(b){
	return (b) ? '🗹' : '🗷';
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


	/** @returns {void} */
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
	 * @returns {string}
	 */
	toHTML(detailsName) {
		// name="${detailsName}"

		const testResultOutput = this.result.reduce(
			(testOutput, currentItem, index) => {
				const result = testOutput + `
					<span>${index}</span>
					<span>${currentItem.expression}</span>
					<span class="ballotBox ${passFail(this.pass)}">${tickCross(currentItem.predicate)}</span>

				`;

				return result;
			},
			''
		);
		// <code>${JSON.stringify(this.result)}</code>
		let result = `
			<details class="test ${passFail(this.pass)}" open>
				<summary>
					<span class="ballotBox ${passFail(this.pass)}">
						${tickCross(this.pass)}
					</span>
					${this.desc}
				</summary>
				<div>
					Predicate:
					<strong>${this.predicate.constructor.name}</strong>
				</div>

				<div class="testResult">
					${testResultOutput}
				</div>
				<div>
					Result:
					<strong>${passFail(this.pass)}</strong>
				</div>
			</details>
		`;

		return result;
	}


}/* Test */


