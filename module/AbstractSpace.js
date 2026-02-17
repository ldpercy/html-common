//
//	AbstractSpace
//



/** SpaceSetting
 * @typedef {Object} SpaceSetting
 */


// not sure if should be base class or interface...

export class Space {

	/** @type string */
	#desc;
	#setting;

	/**
	 * @param {SpaceSetting} setting
	 * @param {string} desc
	 */
	constructor(setting, desc) {
		this.#setting = setting;
		this.#desc = desc;
	}

	get desc() { return this.#desc; }
	get setting() { return this.#setting; }

}/* Space */


