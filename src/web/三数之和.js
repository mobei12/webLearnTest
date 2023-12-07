/*给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
注意：答案中不可以包含重复的三元组。
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
	if (nums.length < 3) return [];
	nums.sort((a, b) => a - b); //排序
	if (nums[i] > 0) return []; //如果第一个数大于0，则不可能有三个数之和为0
	const res = [];
	for (let i = 0; i < nums.length - 2; i++) {
		if (i > 0 && nums[i] === nums[i - 1]) continue; //如果当前数和前一个数相同，则跳过
		let left = i + 1,
			right = nums.length - 1; //左右指针
		while (left < right) {
			//当左指针小于右指针时，执行循环
			const sum = nums[i] + nums[left] + nums[right]; //当前数和左右指针的和
			if (sum === 0) {
				//如果和为0，则添加到结果中
				res.push([nums[i], nums[left], nums[right]]);
				while (left < right && nums[left] === nums[left + 1]) left++; //如果左指针和右指针相等，则左指针向右移动
				while (left < right && nums[right] === nums[right - 1]) right--; //如果左指针和右指针相等，则右指针向左移动
				left++;
				right--;
			} else if (sum < 0) {
				//如果和小于0，则左指针向右移动
				left++;
			} else {
				//如果和大于0，则右指针向左移动
				right--;
			}
		}
	}
	return res;
};
var nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));
