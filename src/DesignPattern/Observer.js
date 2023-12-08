var ConcreteSubject = /** @class */ (function () {
    function ConcreteSubject() {
        this.observers = [];
    }
    ConcreteSubject.prototype.attach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex !== -1) {
            return console.log('该观察者已经被添加');
        }
        else {
            console.log('添加观察者');
            this.observers.push(observer);
        }
    };
    ConcreteSubject.prototype.detach = function (observer) {
        var observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            return console.log('该观察者没有被添加');
        }
        else {
            console.log('删除观察者');
            this.observers.splice(observerIndex, 1);
        }
    };
    ConcreteSubject.prototype.notify = function () {
        console.log('通知所有观察者');
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this);
        }
    };
    // 业务逻辑方法，用来在状态改变时调用notify方法
    ConcreteSubject.prototype.someBusinessLogic = function (state) {
        this.state = state || Math.floor(Math.random() * (10 + 1));
        console.log("\u72B6\u6001\u503C\u88AB\u6539\u53D8\u6210\u4E86: ".concat(this.state));
        this.notify();
    };
    return ConcreteSubject;
}());
/**
 * 观察者实现
 */
var ConcreteObserver = /** @class */ (function () {
    function ConcreteObserver() {
    }
    ConcreteObserver.prototype.update = function (subject) {
        console.log('ConcreteObserver 更新');
        if (subject instanceof ConcreteSubject && subject.state < 3) {
            console.log('ConcreteObserver: Reacted to the event.');
        }
    };
    return ConcreteObserver;
}());
// 客户端代码
var subject = new ConcreteSubject();
var observer1 = new ConcreteObserver();
subject.attach(observer1); //添加观察者
subject.attach(observer1); //该观察者已经被添加
subject.someBusinessLogic(2);
