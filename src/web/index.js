console.log(1);
setTimeout(function () {
    console.log(2);
}, 0);
new Promise(function (resolve, reject) {
    console.log(3);
    resolve();
}).then(function () {
    console.log(4);
});
console.log(5);
//请使用原生 JavaScript 实现一个函数，接收一个数组和一个回调函数作为参数，返回一个新的数组，新数组中的每个元素是原数组中对应元素经过回调函数处理的结果。要求不能使用 Array.prototype.map 方法。
function namef(array, callback) {
    if (Object.prototype.toString.call(callback).slice(8, -1).toLowerCase() != 'function') throw new Error('callback not function')
    var res = []
    for (var i = 0; i < array.length; i++) {
        res.push(callback(array[i]))
    }
    return res
}
var a = ['0.1.1', '0.302.1', '2.3.3', '4.2', '4.3.4.5', '4.3.5']
var res = namef(a, function (item) {
    return item + '-'
})
console.log(res)
//请使用 Proxy 实现一个简单的双向绑定功能，要求可以监听对象的属性变化，并同步到视图中。

/**
 * 请使用 ES6 语法实现一个类，该类具有以下功能：

构造函数接收一个字符串参数，作为类的名称
类具有一个静态方法 getName，返回类的名称
类具有一个实例方法 sayHello，打印出 “Hello, I am {name}”，其中 name 是类的名称
类具有一个 setter 和 getter，用于设置和获取类的名称 
 */
class Es6Class {
    name = ''
    constructor(name) {
        this.name = name
    }
    static getName() {
        return this.name
    }
    set(val) {
        this.name = val
    }
    get() {
        return this.name
    }
}
Es6Class.prototype.sayHello = function () {
    console.log(`Hello, I am ${this.name}`)
}