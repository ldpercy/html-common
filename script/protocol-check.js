//
// protocol check
//

if (new URL(window.location.href).protocol === 'file:') {
	const message = "You are using `file:` protocol - JS modules won't work";
	console.error(message);
	alert(message);
}
