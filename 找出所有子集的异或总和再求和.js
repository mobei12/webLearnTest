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

let arr = [5, 1, 6];
function getsubset(arr) {
	let result = [[]];
	let number = 0;
	for (let i = 0; i < arr.length; i++) {
		let temp = [];
		for (let j = 0; j < result.length; j++) {
			temp.push(result[j].concat(arr[i]));
			if (temp.length > 0) {
				number += temp[temp.length - 1].reduce((a, b) => (a ^= b), 0);
			}
		}
		result = result.concat(temp);
	}
	return number;
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
