var handler = {
	get: function (target, name) {
		if (name === "prototype") {
			return Object.prototype;
		}
		return "Hello, " + name;
	},

	apply: function (target, thisBinding, args) {
		console.log("apply method");
		return args[0];
	},

	construct: function (target, args) {
		console.log(`construct method:${args}`);
		return { value: args[1] };
	}
};

var fproxy = new Proxy(function (x, y) {
	return x + y;
}, handler);
fproxy(1, 2);
new fproxy(1, 2); // {value: 2}
// fproxy.prototype === Object.prototype; // true
// fproxy.foo === "Hello, foo"; // true
