let arr = [1, 2, 3, 1, 2, 3, 1, 2, 3];
function unique(arr) {
	let i = 0;
	let result = [];
	while (i < arr.length) {
		if (arr.findIndex(e => e === arr[i]) === i) {
			result.push(arr[i]);
		}
		i++;
	}
	return result;
}
function unique1(arr) {
	let i = 0;
	let result = [];
	while (i < arr.length) {
		if (!result.some(e => e === arr[i])) {
			result.push(arr[i]);
		}
		i++;
	}
	return result;
}
console.log(unique1(arr));
