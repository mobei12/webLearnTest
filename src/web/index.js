//经典a+b
const add = (a, b) => {
	return a + b;
};
//手动柯里化
const curry = fn => {
	return b => a => {
		return fn(a, b);
	};
};
//原函数
add(1, 2); //3
//柯里化处理后
const curryAdd = curry(add);
const a = curryAdd(1);
const b = a(2); //3
