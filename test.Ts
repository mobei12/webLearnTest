class Father {
	name: string
	constructor(name: string) {
		this.name = name
	}
}
class Son extends Father {
	public age: Number
	constructor(name: string, age: Number) {
		super(name)
		this.name = name
		this.age = age
	}
}
const son = new Son('hah', 12)
console.log(son.name)
