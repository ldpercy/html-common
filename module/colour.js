//
//	colour.js
//



/** @returns {string} */
export function randomColourRGB() {
	const r = Math.round((Math.random()*255));
	const g = Math.round((Math.random()*255));
	const b = Math.round((Math.random()*255));
	const a = Math.random();
	return `rgb(${r} ${g} ${b} / ${a.toFixed(3)})`;
}

/** @returns {string} */
export function randomColourHex() {
	const r = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	const g = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	const b = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	return `#${r}${g}${b}`;
}

/** @returns {string} */
export function randomColourHexWithAlpha() {
	const r = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	const g = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	const b = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	const a = Math.round((Math.random()*255)).toString(16).padStart(2,'0');
	return `#${r}${g}${b}${a}`;
}




export class colourRGBA {


	/*
	I'm going to make the  the alpha channel 0-255 as well to make things simple, an convert in the outputs
	*/


	/** @type {number} */ #r;
	/** @type {number} */ #g;
	/** @type {number} */ #b;
	/** @type {number} */ #a;


	/**
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} a
	 */
	constructor(r=0, g=0, b=0, a=255) {
		this.#r = r;
		this.#g = g;
		this.#b = b;
		this.#a = a;
	}


	/** @returns {number} */ get r() { return this.#r; }
	/** @returns {number} */ get g() { return this.#g; }
	/** @returns {number} */ get b() { return this.#b; }
	/** @returns {number} */ get a() { return this.#a; }


	fromHexString(hexString) {
		const match = hexString.match(/#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?/);
		if (match) {
			this.#r = Number(`0x${match[1]}`);
			this.#g = Number(`0x${match[2]}`);
			this.#b = Number(`0x${match[3]}`);
			this.#a = (match[4]) ? Number(`0x${match[4]}`) : 255;
		}
		else {
			this.#r = -1;
			this.#g = -1;
			this.#b = -1;
			this.#a = -1;
		}
	}


	/** @returns {string} */
	toHex() {
		const r = Math.round(this.r).toString(16).padStart(2,'0');
		const g = Math.round(this.g).toString(16).padStart(2,'0');
		const b = Math.round(this.b).toString(16).padStart(2,'0');
		return `#${r}${g}${b}`;
	}


	/** @returns {string} */
	toHexA() {
		const r = Math.round(this.r).toString(16).padStart(2,'0');
		const g = Math.round(this.g).toString(16).padStart(2,'0');
		const b = Math.round(this.b).toString(16).padStart(2,'0');
		const a = Math.round(this.a).toString(16).padStart(2,'0');
		return `#${r}${g}${b}${a}`;
	}


	/** @returns {string} */
	toRGB() {
		const r = Math.round(this.r);
		const g = Math.round(this.g);
		const b = Math.round(this.b);
		const a = (this.a /255).toFixed(2);
		return `rgb(${r} ${g} ${b} / ${a})`;
	}

	random() {
		this.#r = Math.round((Math.random()*255));
		this.#g = Math.round((Math.random()*255));
		this.#b = Math.round((Math.random()*255));
		this.#a = Math.round((Math.random()*255));
	}

	/** @returns {boolean} */
	isValid() {
		const result =
			(this.r >= 0 && this.r <= 255)
			&& (this.g >= 0 && this.g <= 255)
			&& (this.b >= 0 && this.b <= 255)
			&& (this.a >= 0 && this.a <= 255);
		return result;
	}

}/* colourRGBA */