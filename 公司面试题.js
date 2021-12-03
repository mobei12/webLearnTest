const a = { name: 'a' };
a.name = 'b';
console.log(a.name);
/* --------------------- ------------- */
let a = 0;
let b = a++;
let c = 0;
let d = ++c;
console.log(`a:${a}, b:${b}, c:${c}, d:${d}`);
/* --------------------- ------------- */
[1, 2, 3].map(parseInt)
/* --------------------- ------------- */
var a = 2, b = a, c = b, a = 3;
console.log(a, b, c)
/* --------------------- ------------- */
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}
checkscope()();

var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f();
}
checkscope();
/* --------------------- ------------- */
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