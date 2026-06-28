/*
**	ColourWidget
*/


export class ColourWidget extends HTMLElement {
	static observedAttributes = ["colour"];


	/** @type {HTMLInputElement} */ colorInput;
	/** @type {HTMLInputElement} */ textInput;


	constructor() {
		super();				// Always call super first in constructor

		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				fieldset {
					border: none;
					/* border-radius: var(--gap); */
					/* padding: var(--gap); */
					margin:0em;
					padding:0em;
					display: grid;
					justify-content: space-between;
					gap: var(--gap);
					grid-template-columns: 1fr 1fr ;

					input[type=color] {
						height:100%;
						width:100%;
					}
					input[type=text] {
						text-align: center;
					}
				}
			</style>

			<fieldset>
				<input type="color" id="input-color">
				<input type="text" id="input-text" placeholder="colour string">
			</fieldset>
		`;
		// something is enforcing a min-width...


		//console.log('this', this);
		//console.log('document', document);
		//console.log('shadowRoot', this.shadowRoot);

		this.colorInput = this.shadowRoot.querySelector('#input-color');
		this.textInput = this.shadowRoot.querySelector('#input-text');


		this.shadowRoot.querySelectorAll('input').forEach(
			(element) => {
				element.addEventListener(
					'change',
					(event) => {
						const eventTarget = /** @type {HTMLInputElement} */ (event.target);
						this.internalUpdate(eventTarget.value);
					}
				);
			}
		);

	}/* constructor */


	connectedCallback() {
		//console.log("Custom element added to page.");
	}

	disconnectedCallback() {
		//console.log("Custom element removed from page.");
	}

	connectedMoveCallback() {
		//console.log("Custom element moved with moveBefore()");
	}

	adoptedCallback() {
		//console.log("Custom element moved to new page.");
	}


	attributeChangedCallback(name, oldValue, newValue) {
		console.log(
			`Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
		);
		if (name === 'colour') {
			this.updateColourInputs(newValue);
		}
	}

	internalUpdate(colourString) {
		this.updateColourInputs(colourString);
		this.attributes['colour'].value = colourString;
	}

	updateColourInputs(colourString) {
		this.colorInput.value = colourString;
		this.textInput.value = colourString;
	}

}/* class ColourWidget */


customElements.define("colour-widget", ColourWidget);
