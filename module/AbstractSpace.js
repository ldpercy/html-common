//
//	AbstractSpace
//






// not sure if should be base class or interface...

export class Space {

	/** @type string */
	#name;
	#setting;


	constructor(name, setting) {
		this.#name = name;
		this.#setting = setting;
	}

	get name() { return this.#name; }
	get setting() { return this.#setting; }

}/* Space */