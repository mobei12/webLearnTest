var has = (nums1, nums2) => {
	let result = [];
	nums2.forEach(num => {
		if (nums1.includes(num)) {
			nums1.splice(nums1.indexOf(num), 1);
			result.push(num);
		}
	});
	return result;
};
console.log(has([9, 4, 9, 8, 4], [4, 9, 5]));
