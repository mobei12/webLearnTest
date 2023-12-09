/**手写call*/
Function.prototype.MyCall = function (context) {
	var context = context || window
	context.fn = this

	var args = []
	for (var i = 1, len = arguments.length; i < len; i++) {
		args.push('arguments[' + i + ']')
	}

	var result = eval('context.fn(' + args + ')')

	delete context.fn
	return result
}
/**手写Apply*/
Function.prototype.MyApply = function (content) {
	var context = content || window
	context.fn = this

	var result
	if (!arr) {
		result = context.fn()
	} else {
		var args = []
		for (var i = 0, len = arr.length; i < len; i++) {
			args.push('arr[' + i + ']')
		}
		result = context.fn(toString.apply(null, args))
		//result = eval('context.fn(' + args + ')')
	}

	delete context.fn
	return result
}
var arr = [1, 10, 5, 8, 3]
console.log(Math.max.MyApply(null, arr)) //10
/**手写bind*/
Function.prototype.MyBind = function (contents) {
	//this is the function
	let _this = this
	//bind的参数
	let arr = Array.prototype.slice.call(arguments)
	//bind的this
	var context = arr.splice(0, 1)[0]
	//空函数用来做原型链的中转
	var noop = function () {}
	//返回的函数
	let res = function () {
		//调用的参数+bind的参数
		let args = arr.concat(Array.prototype.slice.call(arguments))
		//调用的this+调用的参数,如果是new的话就是this,否则就是bind的this
		return _this.apply(this instanceof noop ? this : context, args)
	}
	//如果有原型，则继承原型
	if (this.prototype) {
		noop.prototype = this.prototype
	}
	//继承原型
	res.prototype = new noop()
	return res
}
//mdn版本:1.是否支持bind的判定
if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		//2.绑定的是不是函数
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError(
				'Function.prototype.bind - what is trying to be bound is not callable'
			)
		}
		//获取绑定时候的参数
		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(
					this instanceof fNOP ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments))
				)
			}

		if (this.prototype) {
			// Function.prototype doesn't have a prototype property
			fNOP.prototype = this.prototype
		}
		fBound.prototype = new fNOP()
		return fBound
	}
}
/**手写new*/
function myNew() {
	var obj = new Object()
	//获取构造函数
	var Constructor = [].shift.call(arguments)
	console.log(arguments)
	//空函数
	var F = function () {}
	//继承原型
	F.prototype = Constructor.prototype
	//调用构造函数
	var ret = Constructor.apply(obj, arguments)
	//如果构造函数返回的是对象，则返回对象，否则返回obj
	return typeof ret === 'object' ? ret : obj
}
function Otaku(name, age) {
	this.name = name
	this.age = age
	this.habit = 'Games'
}
// 因为缺乏锻炼的缘故，身体强度让人担忧
Otaku.prototype.strength = 60

Otaku.prototype.sayYourName = function () {
	console.log('I am ' + this.name)
}
var otaku = myNew(Otaku, 'Mobeigege', 18)
console.log(otaku) //Mobeigege


/**手写forEach*/
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
/**手写map*/
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
const arrMyForEach = [1, 2, 3];
arrMyForEach.myForEach(item => {
	console.log(item * 3);
});
let arr = [1, 2, 3, [1, 2, 3, [1, 2, 3]]];
/** 数组降维*/
function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr);
	}
	return arr;
}
function es5flatten(arr) {
	let result = [];
	for (let index = 0; index < arr.length; index++) {
		const element = arr[index];
		if (element instanceof Array) {
			result = result.concat(es5flatten(element));
		} else {
			result.push(element);
		}
	}
	return result;
}
function reduceFlatten(arr) {
	return arr.reduce((prev, curr) => {
		if (curr instanceof Array) {
			return prev.concat(reduceFlatten(curr));
		} else {
			return prev.concat(curr);
		}
	}, []);
}
/**	实例 instanceof */
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
