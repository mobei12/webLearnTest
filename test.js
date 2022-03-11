Function.prototype.myBind = function () {
	var _this = this
	if (typeof _this !== 'function') {
		throw `绑定的是不是函数`
	}
	var argBind = Array.prototype.slice.call(arguments, 1),
		onThis = Array.prototype.slice.call(arguments, 0, 1)[0]
	var tempFun = function () {}
	var InBind = function () {
		var allArg = Array.prototype.concat.apply(
			argBind,
			Array.prototype.slice.call(arguments)
		)
		return _this.apply(this instanceof InBind ? this : onThis, allArg)
	}
	tempFun.prototype = _this.prototype
	//InBind.prototype = new tempFun()
	return InBind
}
function getData() {
	this.test = 12223
	return this.name + Array.prototype.slice.call(arguments)
}

var person = {
	name: 'adc'
}
var test1 = getData.myBind(person, 123)
var c = new test1(789)
console.log(c)
console.log(test1)
