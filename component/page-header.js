/*
**	PageHeader
**

I'd like to get this working, but need to figure out how to inherit the styles

Doing a wholesale import was my first hacky thought, but it doesn't seem to work.
	@import "./style.css";					// doesn't work,
Looks like the import is relative to page the element is registered on, so hard to make generic.
	@import "../[common]/style.css";		// works, but is fragile

This works though:
	@import "/html-experiment/[common]/style.css";
*/


export class PageHeader extends HTMLElement {
	// static observedAttributes = ["colour"];

	// /** @type {HTMLInputElement} */ colorInput;
	// /** @type {HTMLInputElement} */ textInput;

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this.shadowRoot.innerHTML = `
			<style>
				@import "/html-experiment/[common]/style.css";				/* this works */

				a { color: color-mix(in srgb, var(--project-colour) 75%, var(--text-colour)); }
				.project-icon {
					display: inline-block;
					height:1.2ex;
					width:1.2ex;
					img:hover {
						filter: drop-shadow(0px 0px 5px var(--accent-colour));
					}
				}
				header h1::before {
					content: none;
				}
			</style>
			<header>
				<h1>
					<a href="../" class="project-icon"><img src="../favicon.svg"></a>
					<a href="">
						<slot name="page-title">Default page title</slot>
					</a>
				</h1>
				<nav>
					<a class="colourScheme-selector" href="?colourScheme=light" title="Light colour scheme" data-colourscheme="light">🟓</a>
					<a class="colourScheme-selector" href="?colourScheme=dark" title="Dark colour scheme" data-colourscheme="dark">🟒</a>
					<a title="To folder" href="./">🖿</a>
					<a title="Parent folder" href="../">🡅</a>
				</nav>
			</header>
		`;

		//console.log('this', this);
		//console.log('document', document);
		//console.log('shadowRoot', this.shadowRoot);

		this.shadowRoot.querySelectorAll('.colourScheme-selector').forEach(
			(element) => {
				element.addEventListener(
					'click',
					(event) => {
						event.preventDefault();
						const eventTarget = /** @type {HTMLElement} */ (event.target);		// this cast is awkward - see if there is a 'proper' way
						this.setColourScheme(eventTarget.dataset.colourscheme);
					}
				);
				// element.addEventListener(
				// 	'dblclick',
				// 	(event) => {
				// 		event.preventDefault();
				// 		const eventTarget = /** @type {HTMLElement} */ (event.target);		// this cast is awkward - see if there is a 'proper' way
				// 		this.setColourScheme(`${eventTarget.dataset.colourscheme}-layout`);
				// 	}
				// );
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
		// console.log(
		// 	`Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
		// );
	}

	/** @param {string} schemeName */
	setColourScheme(schemeName) {
		document.documentElement.dataset.colourscheme = schemeName;
	}

}/* class PageHeader */


customElements.define("page-header", PageHeader);
