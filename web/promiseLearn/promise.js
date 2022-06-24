//声明构造函数
function Promise(executor) {
	this.PromiseState = 'pending'
	this.PromiseResult = null
	this.callBack = {}
	this.onFulfilledCallbacks = []
	this.onRejectedCallbacks = []
	const _this = this
	function resolve(value) {
		//判断当前状态是否是pending
		if (_this.PromiseState !== 'pending') return
		_this.PromiseState = 'fulfilled'
		_this.PromiseResult = value
		while (_this.onFulfilledCallbacks.length > 0) {
			_this.onFulfilledCallbacks.shift()(value)
		}
	}
	function reject(reject) {
		if (_this.PromiseState !== 'pending') return
		_this.PromiseState = 'reject'
		_this.PromiseResult = reject
		while (_this.onRejectedCallbacks.length > 0) {
			_this.onRejectedCallbacks.shift()(reject)
		}
	}
	try {
		executor(resolve, reject)
	} catch (e) {
		reject(e)
	}
}
Promise.prototype.then = function (onFulfilled, onRejected) {
	if (this.PromiseState === 'fulfilled') {
		onFulfilled(this.PromiseResult)
	}
	if (this.PromiseState === 'reject') {
		onRejected(this.PromiseResult)
	}
	if (this.PromiseState === 'pending') {
		this.onFulfilledCallbacks.push(onFulfilled)
		this.onRejectedCallbacks.push(onRejected)
	}
}
