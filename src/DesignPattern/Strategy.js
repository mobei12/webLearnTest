var ValidationStrategy = /** @class */ (function () {
    function ValidationStrategy() {
    }
    ValidationStrategy.prototype.validate = function (value) {
        throw new Error('校验方法必须被重写');
    };
    return ValidationStrategy;
}());
// 具体策略：非空验证
var RequiredValidation = /** @class */ (function () {
    function RequiredValidation() {
        this.errorMessage = '此数据不能为空';
    }
    RequiredValidation.prototype.validate = function (value) {
        return value.trim() !== '';
    };
    return RequiredValidation;
}());
// 具体策略：数字验证
var NumberValidation = /** @class */ (function () {
    function NumberValidation() {
        this.errorMessage = '此数据必须为数字';
    }
    NumberValidation.prototype.validate = function (value) {
        return !isNaN(Number(value));
    };
    return NumberValidation;
}());
// 具体策略：最小长度验证
var MinLengthValidation = /** @class */ (function () {
    function MinLengthValidation(minLength) {
        this.errorMessage = "\u6B64\u5B57\u6BB5\u7684\u6700\u5C0F\u957F\u5EA6\u5FC5\u987B\u4E3A".concat(minLength, "\u3002");
        this.minLength = minLength;
    }
    MinLengthValidation.prototype.validate = function (value) {
        return value.trim().length >= this.minLength;
    };
    return MinLengthValidation;
}());
// 验证器类
var Validator = /** @class */ (function () {
    function Validator() {
        this.strategies = [];
    }
    Validator.prototype.addStrategy = function (strategy) {
        this.strategies.push(strategy);
    };
    Validator.prototype.validate = function (value) {
        var errors = [];
        for (var _i = 0, _a = this.strategies; _i < _a.length; _i++) {
            var strategy = _a[_i];
            if (!strategy.validate(value)) {
                return {
                    isValid: false,
                    errorMessage: strategy.errorMessage
                };
            }
        }
        return { isValid: true };
    };
    return Validator;
}());
// 使用策略模式进行表单验证
var validator = new Validator();
validator.addStrategy(new RequiredValidation());
validator.addStrategy(new NumberValidation());
validator.addStrategy(new MinLengthValidation(2));
var valueToValidate = '1--2';
var isValid = validator.validate(valueToValidate);
console.log(isValid); // { isValid: false, errorMessage: [ '此数据不能为空', '此字段的最小长度必须为2。' ] }
