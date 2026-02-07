



/** testArray
 * @param {function} predicate
 * @param {array} array
 */
export function testArray(predicate, array) {

	let result = true;
	console.log('predicate:', predicate.name);

	array.forEach(
		(element) => {
			if (predicate(element))
			{
				console.log('true', element);
			}
			else {
				console.log('false:', element);
			}
		}
	);
	return result;
}/* testArray */