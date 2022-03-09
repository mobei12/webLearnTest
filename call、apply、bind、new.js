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
