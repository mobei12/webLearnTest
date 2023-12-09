/**
 * 要在当前数组中删除重复项，
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
	let j = nums.length;
	while (j >= 0) {
		if (nums[j] === val) {
			nums.splice(j, 1);
		}
		j--;
	}
	return nums.length;
};
removeElement([3, 2, 2, 3], 3);
//给你一个长度为n的整数数组nums，其中nums的所有整数都在范围[1,n]内，且每个整数出现一次或两次。请你找出所有出现两次的整数，并以数组形式返回。
const removeDuplicates = arr => {
	let ret = [];
	for (let i = 0; i < arr.length; i++) {
		const index = Math.abs(arr[i]) - 1;
		if (arr[index] < 0) {
			ret.push(index + 1);
			continue;
		}
		arr[index] = -arr[index];
	}
	return ret;
};
const repeatArr = [4, 3, 2, 7, 8, 2, 3, 1];
removeDuplicates(repeatArr);
