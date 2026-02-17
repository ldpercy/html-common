//
//	AbstractSpace
//



/** SpaceSetting
 * @typedef {Object} SpaceSetting
 */


// not sure if should be base class or interface...

export class Space {

	/** @type {SpaceSetting} */		#setting;
	/** @type string */				#desc;


	/**
	 * @param {SpaceSetting} setting
	 * @param {string} desc
	 */
	constructor(setting, desc) {
		this.#setting = setting;
		this.#desc = desc;
	}

	/** @returns {SpaceSetting} */
	get setting() { return this.#setting; }

	/** @returns {string} */
	get desc() { return this.#desc; }

	/** @param {string} desc */
	set desc(desc) {this.#desc = desc; }

}/* Space */


