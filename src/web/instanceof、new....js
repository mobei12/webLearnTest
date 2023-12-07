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
	let result = (...args) => {
		if (fn.length == args.length) return fn(...args);
		else return (...arg) => result(...arg, args);
	};
	return result;
}
function add(a, b = 0, c = 0) {
	return a + b + c;
}
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
//Compose函数，传人一次数据，经过不同函数执行，得到结果
const ride = (val = 1) => val * 10;
const Compose =
	(...args) =>
	x =>
		args.reduceRight((res, cb) => cb(res), x);
const compose = Compose(add, ride);
