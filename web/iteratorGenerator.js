/**
 *遍历器
 * @param {Array} list
 * @returns {Object}
 */
function Iterator(list) {
	let i = 0
	return {
		next() {
			return i < list.length ? { value: list[i++] } : { done: true }
		}
	}
}
const list = [1, 2, 3]
const iterator = Iterator(list)
console.log(iterator.next()) // { value: 1 }
console.log(iterator.next()) // { value: 2 }
console.log(iterator.next()) // { value: 3 }
console.log(iterator.next()) //{  done: true }
/**
 * @description:生成器函数
 * @returns @iterator
 */
function* helloWorldGenerator() {
	yield 'hello'
	yield 'world'
	return 'ending'
}

var hw = helloWorldGenerator()
console.log(hw.next()) // { value: 'hello', done: false }
console.log(hw.next()) // { value: 'world', done: false }
console.log(hw.next()) // { value: 'ending', done: true }
