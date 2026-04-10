/* HTMLApp
*/
export class HTMLApp {

	/** @type {string}	*/	appName 		= 'HTMLApp';
	/** @type {string}	*/	appVersion		= '0.0.0';
	/** @type {array}	*/	appInfo			= [];

	/** @type {object}	*/	elementMap 		= {};
	/** @type {object}	*/	element 		= {};
	/** @type {array}	*/	eventListeners	= [];


	constructor() {
		// console.debug('HTMLApp.constructor', this);
		document.addEventListener('DOMContentLoaded', this.documentDOMContentLoaded.bind(this));
		// adding a `.bind(this)` to the addEventListener gives the listener the instance 'this'
	}


	documentDOMContentLoaded() {
		//console.log('documentDOMContentLoaded', arguments, this);
		this.element = HTMLApp.buildElementMap(document, this.elementMap);
		HTMLApp.addEventListeners(this.eventListeners, this);
		console.info(...this.appInfo);
	}/* documentDOMContentLoaded */



	/**
	 * @param {array} eventListeners
	 * @param {any} thisObj
	 */
	static addEventListeners(eventListeners, thisObj) {
		// by default event listeners like these receive the originating element as 'this' (here HTMLDocument)
		// and the event object as argument 0
		// HTMLDocument doesn't seem all that useful as a 'this', especially in a class context
		// adding a `.bind(this)` to the addEventListener keeps 'this' as the instance scope

		// NB Might need updating for other modules/classes/components
		// Also the root node might need changing for SVG? Not sure yet.

		eventListeners.forEach(
			(item) => {
				if (item.element) {
					item.element.addEventListener(
						item.type,
						item.listener.bind(thisObj)
					);
				} else if (item.query) {
					document.querySelectorAll(item.query).forEach((node) => {
						//console.debug('HTMLApp.addEventListeners item.listener', item.listener);
						node.addEventListener(
							item.type,
							item.listener.bind(thisObj)
						);//addEventListener
					});
				}
			}//item
		);
	}/* addEventListeners */


	/** getUrlParameter
	 * @param {string} name
	 * @return {string}
	 */
	getUrlParameter(name)
	{
		return (new URL(window.location.href)).searchParams.get(name);
	}


	/** buildElementMap
	There are different ways this could be done.
	For instance SVG has it's own version of 'getElementById' that is sometimes needed.
	Also a query selector could be used.
	Also might need to change in type sensitive contexts.
	* @return {object}
	*/
	static buildElementMap(baseElement, elementMap) {
		const result = {};
		for (let item in elementMap) {
			//console.debug(item);
			result[item] = baseElement.getElementById(elementMap[item]);
		}
		return result;
	}/* buildElementMap */




	/** newKeyboardHandler
	 * returns a new keyboard handler function, with a bound 'this' object
	 *
	 * @param {object} thisObj
	 */
	static newKeyboardHandler(thisObj) {
		const result =
			/** @param {KeyboardEvent} event */
			function(event) {
				if (!event.altKey && !event.ctrlKey && !event.metaKey) {

					if (this.keyFunctionMap[event.key]) {
						event.preventDefault();
						this.keyFunctionMap[event.key].bind(thisObj)();		// this appears to work for 'this' binding before the call
					}
				}
			}/* keyboardHandler */
		return result;
	}/* newKeyboardHandler */



	/*
	getFormData(formElement) {
		const formData = new FormData(formElement);
		const result = Object.fromEntries(formData);
		return result;
	} */


	/**
	 * @returns {object}
	 */
	getFormData(formElement) {		// @param {HTMLFormElement} formElement		-- can't get this to work yet - figure out
		//console.debug('getFormData arguments', arguments);
		//console.debug('getFormData formElement.elements', formElement.elements);
		const result = {}

		let input;

		for (let i=0 ; i < formElement.elements.length; i++) {


			input = formElement.elements[i];

			if (input.name) { // need to ignore unnamed form elements like buttons

				if (input.type === 'radio') {
					//console.debug('radio', input);
					result[input.name] = formElement[input.name].value;
				}
				else if (input.type === 'checkbox')
				{
					result[input.name] = input.checked;
				}
				else
				{
					result[input.name] = input.value;
				}
			}
		}

		//console.debug('getFormData result' , result);
		return result;
	}


	populateForm(formElement, formData) {
		//console.debug('populateForm', arguments);
		for (let item in formData) {
			//console.debug(item);

			if (formElement.elements[item]) {	// don't try to populate a form field that isn't there
				if (formElement.elements[item].type === 'checkbox')
				{
					formElement.elements[item].checked = formData[item];
				}
				else
				{
					formElement.elements[item].value = formData[item];
				}
			}
		}
	}



	/** setColourScheme
	 * @param {string} schemeName
	 */
	setColourScheme(schemeName) {
		//document.documentElement.style.setProperty('--colourScheme', schemeName);
		//document.documentElement.className = document.documentElement.className.replace(/\b(colourScheme-\w+)\b/,`colourScheme-${schemeName}`);
		document.documentElement.dataset.colourscheme = schemeName;
		localStorage[`${this.appName}_colourScheme`] = schemeName;
	}


}/* HTMLApp */
