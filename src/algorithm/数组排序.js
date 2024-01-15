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
var arr2 = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
//排序成如下 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']


/**
 * 按指定顺序对给定的版本进行分类。
 *
 * @param {Array} arr - 版本数组
 * @param {string} order - 1升序，0降序
 * @return {Array} - The sorted array of versions.
 */
function sortVersion(arr, order = '1') {
    function sortIt(current, next) {
        const currentN = current.split('.').map(Number)
        const nextN = next.split('.').map(Number)
        for (let i = 0; i < Math.max(currentN.length, nextN.length); i++) {
            const num1 = i < currentN.length ? currentN[i] : 0;
            const num2 = i < nextN.length ? nextN[i] : 0;
            if (num1 !== num2) {
                return order === '1' ? num1 - num2 : num2 - num1
            }

        }
        return 0
    }
    return arr.sort(sortIt)
}