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




export class colourRGB {

	#r;
	#g;
	#b;

	constructor(r=0,g=0,b=0) {
		this.#r = r;
		this.#g = g;
		this.#b = b;
	}

	get r() { return this.#r }
	get g() { return this.#g }
	get b() { return this.#b }



	toHex() {
		const r = Math.round(this.r).toString(16).padStart(2,'0');
		const g = Math.round(this.g).toString(16).padStart(2,'0');
		const b = Math.round(this.b).toString(16).padStart(2,'0');
		return `#${r}${g}${b}`;
	}

	toRGB() {
		const r = Math.round(this.r);
		const g = Math.round(this.g);
		const b = Math.round(this.b);
		return `rgb(${r} ${g} ${b})`;
	}

}