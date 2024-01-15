var arr = [
	1, 2, 3, 4, 2, 2, 3, 4, 5, 2, 0, 123, 33
]

/**
 *使用气泡排序算法对数组进行排序.
 *
 * @param {Array} arr - The array to be sorted.
 * @return {Array} - The sorted array.
 */
function bubbleSort(arr) {
	for (let i = 0; i < arr.length - 1; i++) {
		for (let j = 0; j < arr.length - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
			}
		}
	}
	return arr
}
/**
 * 使用快速排序算法对数组进行分组。
 *
 * @param {Array} arr - The array to be sorted.
 * @return {Array} - The sorted array.
 */
function quickSort(arr) {
	if (arr.length <= 1) return arr
	let leftArr = [], rightArr = [], mid = Math.floor(arr.length / 2)
	for (let i = 0; i < arr.length; i++) {
		if (i === mid) continue
		else if (arr[i] <= arr[mid]) {
			leftArr.push(arr[i])
		} else {
			rightArr.push(arr[i])
		}
	}
	return [...quickSort(leftArr), arr[mid], ...quickSort[rightArr]]
}
console.log(quickSort(arr))