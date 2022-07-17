// 监听数组
const arr = [1, 2, 3, 4];
const newArr = new Proxy(arr, {
	get(target, key, receiver) {
		console.log(`get:key-${key}`);
		return Reflect.get(target, key, receiver);
	},
	set(target, key, value, receiver) {
		console.log(`set:key-${key}`);
		return Reflect.set(target, key, value, receiver);
	},
	has(target, key) {
		console.log(`has:key-${key}`);
		return true
	},
	deleteProperty(target, key) {
		console.log(`deleteProperty:${key}`);
		return true
	},
	defineProperty(target, propKey, propDesc) {
		console.log(`deleteProperty:${propKey}`);
		return true
	}
});
//newArr.push(6);
newArr.splice(0,1)
console.log(newArr)
