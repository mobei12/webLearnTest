Array.prototype.myForEach = function (callback, arg) {
	if (this === null) throw new TypeError('this is null or not defined');
	if (typeof callback !== 'function')
		throw new TypeError(`${callback}this is  not function`);
	const o = Object(this);
	console.log(this);
	const length = o.length >>> 0;
	let index = 0;
	while (index < length) {
		if (index in o) callback.call(arg, o[index], index, o);
		index++;
	}
};
Array.prototype.myMap = function (callback, arg) {
	if (this === null) throw new TypeError('this is null or not defined');
	if (typeof callback !== 'function')
		throw new TypeError(`${callback}this is  not function`);
	const o = Object(this);
	console.log(this);
	const length = o.length >>> 0;
	let index = 0;
	const result = [];
	while (index < length) {
		if (index in o) result.push(callback.call(arg, o[index], index, o));
		index++;
	}
    return result
};
const arr = [1, 2, 3];
arr.myForEach(item => {
	console.log(item * 3);
});
