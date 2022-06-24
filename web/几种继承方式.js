//1.原型链继承
function Parent1() {
    this.name = 'parent';
}
Parent1.prototype.getName = function () {
    console.log(this.name);
}
function Child1() {
}
Child1.prototype = new Parent1();
var child1 = new Child1();
console.log(child.getName());//parent
//2.构造函数继承
function Parent2() {
    this.name = 'parent';
}
Parent2.prototype.getName = function () {
    console.log(this.name);
}
function Child2() {
    Parent2.call(this);
}
var child2 = new Child2();
console.log(child2.getName());//parent
//3.组合继承
function Parent3() {
    this.name = 'parent';
}
Parent3.prototype.getName = function () {
    console.log(this.name);
}
function Child3() {
    Parent3.call(this);
}
Child3.prototype = new Parent3();
Child3.prototype.constructor = Child3;
var child = new Child3();
console.log(child3.getName());//parent
//4.原型式继承
function createObj(o) {
    function F() { }
    F.prototype = o;
    return new F();
}
//5.寄生组合式继承
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
