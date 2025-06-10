function mySetInterval(fn, interval = 0) {
	if (typeof fn !== 'function') {
		throw new Error('fn must be function')
	}
	let intervalId = null

	function execute() {
		fn()
		intervalId = setTimeout(execute, interval)
	}

	intervalId = setTimeout(execute, interval)


	return {
		clearInterval: () => {
			clearTimeout(intervalId)
		}
	}
}
function mySetInterval1(callback, delay, ...args) {
	let timerId;

	function execute() {
		callback(...args);
		timerId = setTimeout(execute, delay);
	}

	timerId = setTimeout(execute, delay);

	return {
		clear: function() {
			clearTimeout(timerId);
		}
	};
}

// 使用示例
const interval = mySetInterval1((a, b) => {
	console.log(`自定义间隔执行，参数: ${a}, ${b}`);
}, 1000, '参数1', '参数2');

// 5秒后清除定时器
setTimeout(() => {
	interval.clear();
	console.log('定时器已清除');
}, 5000);
