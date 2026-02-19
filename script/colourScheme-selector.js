

document.querySelectorAll('.colourScheme-selector').forEach(
	(element) => {
		element.addEventListener(
			'click',
			(event) => {
				event.preventDefault();

				const eventTarget = /** @type {HTMLElement} */ (event.target);		// this cast is awkward - see if there is a 'proper' way

				this.setColourScheme(eventTarget.dataset.colourscheme);
			}
		);
	}
);

/** @param {string} schemeName */
function setColourScheme(schemeName) {
	document.documentElement.dataset.colourscheme = schemeName;
}


let urlParam_colourScheme = (new URL(window.location.href)).searchParams.get('colourScheme');


if (urlParam_colourScheme) {
	setColourScheme(urlParam_colourScheme);
}

