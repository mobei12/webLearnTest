function myInstanceof(left, right) {
	let proto = Object.getPrototypeOf(left);
	while (proto) {
		if (proto === null) return false;
		if (proto === right.prototype) {
			return true;
		}
		proto = Object.getPrototypeOf(proto);
	}
}
/* 柯里化 */
function curry(fn) {
	let judge = (...arg) => {
		if (arg.length == fn.length) return fn(...arg);
		return (...arg2) => {
			return judge(...arg, ...arg2);
		};
	};
	return judge;
}
function add(a, b, c) {
	return a + b + c;
}
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
