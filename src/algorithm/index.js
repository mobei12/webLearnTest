function Foo(){
  this.a = 1
}
Foo.prototype.b=2
const foo = new Foo()
console.log(foo.a)
console.log(foo.b)
console.log(foo.__proto__.a)
console.log(foo.__proto__.b)
console.log(Foo.a)
console.log(Foo.prototype.a)