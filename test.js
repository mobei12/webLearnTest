class Test {
	constructor(a) {
		this.a = a;
	}
	add(b) {
		return this.a + b;
	}
}
const test = new Test('test');
console.log(test.add(1));