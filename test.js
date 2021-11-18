var arr = [3, 4, 5, 6, 7, 8];
function getsubset(arr) {
	var result = [[]];
	for (var i = 0; i < arr.length; i++) {
		var temp = [];
		for (var j = 0; j < result.length; j++) {
			temp.push(result[j].concat(arr[i]));
		}
		result = result.concat(temp);
	}
	return result;
}
/**
@param {Array} arr
@returns {number}	
*/
function getpermutation(arr) {
	let resNumber = 0;
	let res = getsubset(arr);
	while (res.length > 0) {
		resNumber += res.pop().reduce((a, b) => (a ^= b), 0);
	}
	return resNumber;
}
console.log(getpermutation(arr));
