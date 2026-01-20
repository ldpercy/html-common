//
//	SVG
//


//
//	Interface
//




/* SVG
*/
export class SVG {


	static scaleViewBox(scale, viewBox) {

	}


	// padViewBox(padding, viewBox = '-1200 -1200 2400 2400') {
	// 	const vb = splitViewBox(viewBox);
	// 	return `${vb.x-padding} ${vb.y-padding} ${vb.width + 2*padding} ${vb.height + 2*padding}`;
	// }


}/* SVG */






/* CartesianGrid
*/
export class CartesianGrid {

	box;

	constructor(space, box, spacingMajor=500, spacingMinor=100) {
		this.space = space;
		this.box = box;
		this.spacingMajor = spacingMajor;
		this.spacingMinor = spacingMinor;
	}


	get axes() {
		// todo: add axis labels
		const result = `
			<g class="axis">
				<line x1="-60%" y1="0" x2="60%" y2="0"><title>x axis</title></line>
				<line x1="0" y1="-60%" x2="0" y2="60%"><title>y axis</title></line>
				<circle class="origin"><title>origin</title></circle>
			</g>
		`;
		return result;
	}/* get axes */


	/* getGridlines
	*/
	getGridlines(spacing, className) {
		let result = '';
		let xLines = '', yLines = '';
		let x = this.box.xMin - (this.box.xMin % spacing);
		let y = this.box.yMin - (this.box.yMin % spacing);

		for (x; x <= this.box.xMax; x += spacing){
			xLines += `<line x1="${x}" y1="${-this.box.yMin}" x2="${x}" y2="${-this.box.yMax}"><title>x: ${x}</title></line>`;
		}
		for (y; y <= this.box.yMax; y += spacing){
			yLines += `<line x1="${this.box.xMin}" y1="${-y}" x2="${this.box.xMax}" y2="${-y}"><title>y: ${y}</title></line>`;
		}

		result = `
			<g class="${className}">
				<g class="x">${xLines}</g>
				<g class="y">${yLines}</g>
			</g>
		`;

		return result;
	}/* getGridlines */


	getLabels(spacing) {

		let xLabels = '', yLabels = '';
		let x = this.box.xMin - (this.box.xMin % spacing);
		let y = this.box.yMin - (this.box.yMin % spacing);

		const adjust = -5;

		for (x; x <= this.box.xMax; x += spacing){
			xLabels += (x !== 0) ? `<text x="${x}" y="${adjust}"><title>x: ${x}</title>${x}</text>` : '';
		}
		for (y; y <= this.box.yMax; y += spacing){
			yLabels += (y !== 0) ? `<text x="${adjust}" y="${-y}"><title>y: ${y}</title>${y}</text>` : '';	/* note negative y in here - needs to be made space-aware  */
		}

		const result = `
			<g class="label">
				<g class="x">
					${xLabels}
				</g>
				<g class="y">
					${yLabels}
				</g>
			</g>
		`;

		return result;
	}/* get labels */



	toString() {
		const result= `
			<g class="cartesian-grid">
				${this.getGridlines(this.spacingMinor,'minor')}
				${this.getGridlines(this.spacingMajor,'major')}
				${this.axes}
				${this.getLabels(this.spacingMajor)}
			</g>
		`;

		return result;
	}/* toString */

}/* CartesianGrid */



/* PolarGrid
*/
export class PolarGrid {

	rectangle;

	constructor(
			space,
			rectangle,
			spacingMajor=500,
			spacingMinor=100,
			angleMajor=45,
			angleMinor=5,
		) {
		this.space = space;
		this.rectangle = rectangle;
		this.spacingMajor = spacingMajor;
		this.spacingMinor = spacingMinor;
		this.angleMajor = angleMajor;
		this.angleMinor = angleMinor;

		this.radius = .6 * Math.max(rectangle.width, rectangle.height);
	}/* constructor */


	toString() {
		const result= `
			${this.getGridlines(this.spacingMinor,'minor', this.angleMinor)}
			${this.getGridlines(this.spacingMajor,'major', this.angleMajor)}
			${this.polarAxis}
			${this.getLabels(this.spacingMajor, this.angleMinor)}
		`;

		return result;
	}/* toString */


	get polarAxis() {
		// todo: add axis labels
		const result = `
			<g class="axis">
				<line x1="0" y1="0" x2="0" y2="${-this.radius}"><title>polar axis</title></line>
			</g>
		`;
		return result;
	}/* get polarAxis */


	/* getGridlines
	*/
	getGridlines(spacing, className, angle) {
		let result = '';
		let circles = '', radials = '';

		const a = new this.space.Angle(0);
		const p = this.space.newPoint('radial gridline');

		for (let r = 0; r <= this.radius; r += spacing){
			circles += `<circle cx="0" cy="0" r="${r}"><title>r: ${r}</title></circle>`;
		}

		for (let d = 0; d <= 360; d += angle){
			a.degrees = d;
			p.polar = new this.space.PolarCoordinates(a, this.radius);
			radials += `<line x1="0" y1="0" x2="${p.x}" y2="${-p.y}"><title>${d}°</title></line>`;
		}

		result = `
			<g class="${className}">
				<g class="circles">${circles}</g>
				<g class="radials">${radials}</g>
			</g>
		`;

		return result;
	}/* getGridlines */


	/* getLabels
	*/
	getLabels(spacing, angleSpacing) {
		let result = '';
		let rLabels = '', aLabels = '';

		const a = new this.space.Angle(0);
		const p = this.space.newPoint('radial gridline');

		const adjust = 5;

		for (let r = spacing; r <= this.radius; r += spacing){
			rLabels += `<text x="${adjust}" y="${-r}"><title>r: ${r}</title>${r}</text>`;
		}

		for (let d = 0; d < 360; d += angleSpacing){
			a.degrees = d;
			p.polar = new this.space.PolarCoordinates(a, this.radius);
			aLabels += `<text x="${p.x}" y="${-p.y}"><title>${d}°</title>${d}°</text>`;
		}

		result = `
			<g class="label">
				<g class="r">
					${rLabels}
				</g>
				<g class="a">
					${aLabels}
				</g>
			</g>
		`;

		return result;
	}/* getLabels */



}/* PolarGrid */



export class Box {
	/** type {number} */	x;
	/** type {number} */	y;
	/** type {number} */	width;
	/** type {number} */	height;

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(
			x, y, width, height,
		) {
		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
	}

	/** @returns {number} */	get xMin() { return this.x; }
	/** @returns {number} */	get xMid() { return this.x + this.width/2; }
	/** @returns {number} */	get xMax() { return this.x + this.width; }
	/** @returns {number} */	get yMin() { return this.y; }
	/** @returns {number} */	get yMid() { return this.y + this.height/2; }
	/** @returns {number} */	get yMax() { return this.y + this.height; }
}/* Box */




/* ViewBox
*/
export class ViewBox extends Box{

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(
			x, y, width, height,
		) {
		super(x, y, width, height);
	}

	/** @param {string} viewBoxString */
	fromString(viewBoxString) {
		const vba    = viewBoxString.split(' ');
		this.x      = parseInt(vba[0]);
		this.y      = parseInt(vba[1]);
		this.width  = parseInt(vba[2]);
		this.height = parseInt(vba[3]);
		return this;
	}

	/** @returns {string} */
	toString() {
		return `${this.x} ${this.y} ${this.width} ${this.height}`;
	}

	/**
	 * @param {number} scale
	 * @returns {string}
	 */
	toStringScaled(scale) {
		return `${this.x * scale} ${this.y * scale} ${this.width * scale} ${this.height * scale}`;
	}

	/**
	 * @param {number} padding
	 * @returns {string}
	 */
	toStringPadded(padding) {
		return `${this.x - padding} ${this.y - padding} ${this.width + 2*padding} ${this.height + 2*padding}`;
	}


}/* ViewBox */



/* Chunk
*/
export class Chunk {
	/** @type {string} */	text;
	/** @type {string} */	defs;

	/**
	 * @param {string} text
	 * @param {string} defs
	 */
	constructor(
		text = '',
		defs = ''
	) {
		this.text = text;
		this.defs = defs;
	}

	/** @param {Chunk} svgChunk */
	add(svgChunk) {
		this.text += svgChunk.text;
		this.defs += svgChunk.defs;
	}

	/** @return {string} */
	toString() {
		const result = `
			<defs>
				${this.defs}
			</defs>
			${this.text}`;
		return result;
	}
}/* Chunk */

