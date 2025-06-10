function cacheAsyncFnWrap(fn) {
	let i = 0;
	return function (...args) {
		if (i === 0) {
			i++;
			return fn.apply(this, args);
		}
		else {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve(fn.apply(this, args));
				}, 0)
			})
		}
	}
}

/**
实现这个函数： function cacheAsyncFnWrap(fn) {}
满足如下要求：
1. 如果第一次调用，那就等待调用返回
2. 如果第二次调用，那就等待第一次调用结束之后一起返回结果
3. 如果第三次调用，已经有结果了，那么直接返回结果
 **/

// 测试代码：
function testFn() {
	console.log('testFn called');
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve('testFnResult');
		}, 5000)
	})
}

const wrapedTestFn = cacheAsyncFnWrap(testFn);

wrapedTestFn().then(res => { console.log('1:', res); });

setTimeout(() => {
	wrapedTestFn().then(res => { console.log('2:', res); });
}, 2000);

setTimeout(() => {
	wrapedTestFn().then(res => { console.log('3:', res); });
}, 6000);

/**
打印结果将是：
testFn called
// 过了5秒之后打印：
1: testFnResult
2: testFnResult
// 过了6秒之后打印：
3: testFnResult
 **/
