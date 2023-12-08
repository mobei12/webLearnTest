interface Product {
	name: string;
	price: string;
	detail(): void;
}
class ProductA implements Product {
	name: string;
	price: string;
	constructor(name: string, price: string) {
		this.name = name;
		this.price = price;
	}
	detail(): void {
		console.log(`ProductA-name: ${this.name}, price: ${this.price}`);
	}
}
class ProductB implements Product {
	name: string;
	price: string;
	size: number;
	constructor(name: string, price: string, size: number) {
		this.name = name;
		this.price = price;
		this.size = size;
	}
	detail(): void {
		console.log(
			`ProductB-name: ${this.name}, price: ${this.price}, size: ${this.size}`
		);
	}
}
// 工厂类
class Factory {
	public static createProduct(type: string, ...args): Product {
		if (type === 'A') {
			return new ProductA(...(args as [string, string]));
		} else if (type === 'B') {
			return new ProductB(...(args as [string, string, number]));
		} else {
			throw new Error('Invalid Product Type');
		}
	}
}
/* -------------------使用-------------------*/
const productA = Factory.createProduct('A', 'ProductA', '100');
const productB = Factory.createProduct('B', 'ProductB', '100', "10");
console.log(productA);
console.log(productB);
