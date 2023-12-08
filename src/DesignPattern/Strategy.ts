// 策略接口
type TValue = string;
class ValidationStrategy {
	validate(value: TValue): Boolean {
		throw new Error('校验方法必须被重写');
	}
}
interface ValidationStrategy {
	validate(value: TValue): Boolean;
	errorMessage: string;
}
// 具体策略：非空验证
class RequiredValidation implements ValidationStrategy {
	errorMessage: string = '此数据不能为空';
	validate(value: TValue): Boolean {
		return value.trim() !== '';
	}
}

// 具体策略：数字验证
class NumberValidation implements ValidationStrategy {
	errorMessage: string = '此数据必须为数字';
	validate(value: TValue): Boolean {
		return !isNaN(Number(value));
	}
}

// 具体策略：最小长度验证
class MinLengthValidation implements ValidationStrategy {
	private minLength: number;
	errorMessage: string;
	constructor(minLength: number) {
		this.errorMessage = `此字段的最小长度必须为${minLength}。`;
		this.minLength = minLength;
	}

	validate(value: TValue): Boolean {
		return value.trim().length >= this.minLength;
	}
}

// 验证器类
class Validator {
	private strategies: ValidationStrategy[] = [];
	constructor() {}

	addStrategy(strategy: ValidationStrategy): void {
		this.strategies.push(strategy);
	}

	validate(value: TValue): { isValid: boolean; errorMessage?: string } {
		let errors: string[] = [];
		for (const strategy of this.strategies) {
			if (!strategy.validate(value)) {
				return {
					isValid: false,
					errorMessage: strategy.errorMessage
				};
			}
		}
		return { isValid: true };
	}
}

// 使用策略模式进行表单验证
const validator: Validator = new Validator();
validator.addStrategy(new RequiredValidation());
validator.addStrategy(new NumberValidation());
validator.addStrategy(new MinLengthValidation(2));

console.log(validator.validate('1--2')); // { isValid: false, errorMessage: '此数据必须为数字' }
console.log(validator.validate('1')); // { isValid: false, errorMessage: '此字段的最小长度必须为2。' }
console.log(validator.validate('')); // { isValid: false, errorMessage: '此数据不能为空' }
