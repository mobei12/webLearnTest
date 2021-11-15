Function.prototype.MyBind = function (contents) {
	let _this = this; //this is the function
	let arr = Array.prototype.slice.call(arguments); //bind的参数
	var context = arr.splice(0, 1)[0]; //bind的this
	var noop = function () {}; //空函数
	let res = function () {
		//返回的函数
		let args = arr.concat(Array.prototype.slice.call(arguments)); //调用的参数+bind的参数
		return _this.apply(this instanceof noop ? this : context, args); //调用的this+调用的参数,如果是new的话就是this,否则就是bind的this
	};
	if (this.prototype) {
		//如果有原型，则继承原型
		noop.prototype = this.prototype;
	}
	res.prototype = new noop(); //继承原型
	return res;
};
function Test(a, b, c) {
	this.a = a;
}
let test = Test.MyBind({}, 1, 2, 3);
console.log(test);
