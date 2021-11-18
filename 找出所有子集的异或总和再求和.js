/* 
示例 1：
输入：nums = [1,3]
输出：6
解释：[1,3] 共有 4 个子集：
- 空子集的异或总和是 0 。
- [1] 的异或总和为 1 。
- [3] 的异或总和为 3 。
- [1,3] 的异或总和为 1 XOR 3 = 2 。
0 + 1 + 3 + 2 = 6

*/

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
