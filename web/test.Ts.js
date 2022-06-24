var __extends =
	(this && this.__extends) ||
	(function () {
		var extendStatics = function (d, b) {
			extendStatics =
				Object.setPrototypeOf ||
				({ __proto__: [] } instanceof Array &&
					function (d, b) {
						d.__proto__ = b
					}) ||
				function (d, b) {
					for (var p in b)
						if (Object.prototype.hasOwnProperty.call(b, p))
							d[p] = b[p]
				}
			return extendStatics(d, b)
		}
		return function (d, b) {
			if (typeof b !== 'function' && b !== null)
				throw new TypeError(
					'Class extends value ' +
						String(b) +
						' is not a constructor or null'
				)
			extendStatics(d, b)
			function __() {
				this.constructor = d
			}
			d.prototype =
				b === null
					? Object.create(b)
					: ((__.prototype = b.prototype), new __())
		}
	})()
var Father = /** @class */ (function () {
	function Father(name) {
		this.name = name
	}
	return Father
})()
var Son = /** @class */ (function (_super) {
	__extends(Son, _super)
	function Son(name, age) {
		var _this = _super.call(this, name) || this
		_this.name = name
		_this.age = age
		return _this
	}
	return Son
})(Father)
var son = new Son('hah', 12)
console.log(son.name)
