var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ProductA = /** @class */ (function () {
    function ProductA(name, price) {
        this.name = name;
        this.price = price;
    }
    ProductA.prototype.detail = function () {
        console.log("ProductA-name: ".concat(this.name, ", price: ").concat(this.price));
    };
    return ProductA;
}());
var ProductB = /** @class */ (function () {
    function ProductB(name, price, size) {
        this.name = name;
        this.price = price;
        this.size = size;
    }
    ProductB.prototype.detail = function () {
        console.log("ProductB-name: ".concat(this.name, ", price: ").concat(this.price, ", size: ").concat(this.size));
    };
    return ProductB;
}());
// 工厂类
var Factory = /** @class */ (function () {
    function Factory() {
    }
    Factory.createProduct = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (type === 'A') {
            return new (ProductA.bind.apply(ProductA, __spreadArray([void 0], args, false)))();
        }
        else if (type === 'B') {
            return new (ProductB.bind.apply(ProductB, __spreadArray([void 0], args, false)))();
        }
        else {
            throw new Error('Invalid Product Type');
        }
    };
    return Factory;
}());
/* -------------------使用-------------------*/
var productA = Factory.createProduct('A', 'ProductA', '100');
var productB = Factory.createProduct('B', 'ProductB', '100', "10");
console.log(productA);
console.log(productB);
