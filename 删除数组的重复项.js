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
