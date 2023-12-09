/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
//hash表
var intersect = function (nums1, nums2) {
	let arr = [];
	let map = {};
	for (let i = 0; i < nums1.length; i++) {
		if (!map[nums1[i]]) {
			map[nums1[i]] = 1;
		} else {
			map[nums1[i]]++;
		}
	}
	for (let i = 0; i < nums2.length; i++) {
		if (map[nums2[i]]) {
			arr.push(nums2[i]);
			map[nums2[i]]--;
		}
	}
	return arr;
};
//排序+双指针
function intersect2(nums1, nums2) {
	nums1.sort((a, b) => a - b);
	nums2.sort((a, b) => a - b);
	let arr = [];
	while (nums1.length && nums2.length) {
		if (nums1[0] === nums2[0]) {
			arr.push(nums1[0]);
			nums1.shift();
			nums2.shift();
		} else if (nums1[0] > nums2[0]) {
			nums2.shift();
		} else {
			nums1.shift();
		}
	}
	return arr;
}
console.log(intersect2([1, 2, 2, 1], [2, 2]));
