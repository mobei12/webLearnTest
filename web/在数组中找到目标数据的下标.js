/* 
    输入一个数组，输出数组中目标数据的下标。
    例如：arr:[1,2,3,4,5,6,7,8,9,10],target:5
    arr[0] + arr[3] = 5
    输出:[0,3]
    输入:arr:[0,0] target:0
    输出:[0,1]
    arr[0] + arr[1] = 0
*/
function findIndex(arr, target) {
	let map = new Map();
	map.set(arr[0], 0);
	for (let i = 1; i < arr.length; i++) {
		if (map.has(target - arr[i])) {
			return [map.get(target - arr[i]), i];
		}
		map.set(arr[i], i);
	}
}
console.log(findIndex([2, 7, 11, 15], 9));
