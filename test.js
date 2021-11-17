/**
 * @param {number[]} nums
 * @return {number}
 */
function getXORSum(nums) {
	var sum = 0;
	for (var i = 0; i < nums.length; i++) {
		sum ^= nums[i];
	}
	return sum;
}
var subsetXORSum = function (nums) {
	let i = 0;
	while (i < nums.length) {
		let j = i + 1;
		while (j < nums.length) {
			let sum = getXORSum([nums[i], nums[j]]);
			if (nums.includes(sum)) {
				return sum;
			}
			j++;
		}
		i++;
	}
};
console.log(subsetXORSum([3, 4, 5, 6, 7, 8]));
