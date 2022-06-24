let arr = [1, 2, 3, [1, 2, 3, [1, 2, 3]]];
function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
}
function es5flatten(arr) {
	let result = [];
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		if (element instanceof Array) {
			result = result.concat(es5flatten(element));
		} else {
			result.push(element);
		}
	}
	return result;
}
function reduceFlatten(arr) {
	return arr.reduce((prev, curr) => {
		if (curr instanceof Array) {
			return prev.concat(reduceFlatten(curr));
		} else {
			return prev.concat(curr);
		}
	}, []);
}
