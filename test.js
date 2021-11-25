function person(name) {
	var o = new Object();
	o.sayName = function () {
		console.log(name);
	};
	return o;
}

var person1 = person('a');
person1.sayName();
person1.name = 'b'
person1.sayName();