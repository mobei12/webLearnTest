// 请设计一个 TaskPool 类如下
// 需要按照如下顺序打印
//打印 register 3000 task1
//打印 register 2000 task2
//打印 register 1000 task3
//过 3 秒打印 run log 1
//打印 register 10 task4
//间隔2秒打印 run log 2
//又间隔1秒打印 run log 3
//又间隔10毫秒打印 run log 4
class TaskPool {
	constructor() {
		this.task = [];
	}
	delayRun(time, callback) {
		console.log(`register${time} ${callback.name}`);
		setTimeout(() => {
			callback();
		}, time);
		return this;
	}
}
const taskPool = new TaskPool();
taskPool
	.delayRun(3000, function task1() {
		console.log('run log 1');
	})
	.delayRun(2000, function task2() {
		console.log('run log 2');
	})
	.delayRun(1000, function task3() {
		console.log('run log 3');
	});

setTimeout(() => {
	taskPool.delayRun(10, function task4() {
		console.log('run log 4');
	});
}, 4000);
