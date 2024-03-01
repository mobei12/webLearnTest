import {createRoot} from 'react-dom/client'

export const root = createRoot(document.getElementById('test'))
const states = []//数据结构:[1,2,3]
const stateSetters = []////数据结构:[fn1,fn2]
let statesIndex = 0

/**
 * 创建新状态和状态设置器，并将它们分别添加到状态数组和状态设置器数组中的函数。
 * @param {any} initVal - 状态的初始值
 * @return {Array} 包含状态和状态设置器的数组
 */
export function useState(initVal) {
	states[statesIndex] = createState(initVal, statesIndex)
	stateSetters.push(createStateSetter(statesIndex))
	const _state = states[statesIndex]
	const _setState = stateSetters[statesIndex]
	statesIndex++
	return [_state, _setState]
}

/**
 * 根据初始值和索引创建状态，使用states数组。
 * @param {type} initVal - 状态的初始值
 * @param {type} index - 用于访问states数组的索引
 * @return {type} 基于索引的状态值，如果索引超出范围，则使用初始值
 */
function createState(initVal, index) {
	return states[index] ? states[index] : initVal
}

/**
 * 创建一个给定索引的状态设置器函数。
 * @param {number} index - 要设置状态的索引
 * @return {function} 状态设置器函数
 */
function createStateSetter(index) {
	//根据初始化类型的不同，缓存数据
	return (newVal) => {
		if (typeof newVal === 'function') {
			states[index] = newVal(states[index])
		} else {
			states[index] = newVal
		}
		//调用更新
		render()
	}
}

/**
 * 用于管理状态转换的Reducer钩子。
 * @param {function} reducer - 用于状态转换的函数
 * @param {any} initialArg - Reducer的初始状态或参数
 * @param {function} init - 用于初始化状态的可选函数
 * @return {Array} 包含当前状态和dispatch函数的数组
 */
export function useReducer(reducer, initialArg, init) {
	const [state, setState] = useState(init ? init(initialArg) : initialArg)

	function dispatch(action) {
		const nState = reducer(state, action)
		setState(nState)
	}

	return [state, dispatch]

}

const effects = []//[[1,2]] 二维数组
let effectsIndex = 0

/**
 * 当依赖项发生变化时执行回调函数。
 * @param {function} setUp - 要执行的回调函数
 * @param {Array} dependencies - 要检查变化的依赖项
 * @return {void}
 */
export function useEffect(setUp, dependencies) {
	if (typeof setUp !== 'function') {
		throw new TypeError('回调函数要为函数')
	}
	if (dependencies && !Array.isArray(dependencies)) {
		throw new TypeError('dependencies 应该是数组')
	}
	let isChanged = true
	if (effects[effectsIndex]) {
		//effects = []//[[1,2]] 二维数组,对比当前依赖和存储不一致则更新
		isChanged = dependencies.some((dep, index) => dep !== effects[effectsIndex][index])
	}

	if (isChanged || dependencies === undefined) {
		setUp()
	}
	effects[effectsIndex] = dependencies
	effectsIndex++
}

const memoArr = []//[[cb,dep]],cb：回掉函数，dep：依赖
let useMemoIndex = 0

/**
 * 根据依赖项对函数调用的结果进行记忆
 * @param {Function} calculate - 要进行记忆的函数
 * @param {Array} dependencies - 函数的依赖项
 * @returns {*} - 函数的记忆结果
 */
export function useMemo(calculate, dependencies) {
	// 验证输入类型
	if (typeof calculate !== 'function') {
		throw new TypeError('回调函数要为函数')
	}
	if (dependencies && !Array.isArray(dependencies)) {
		throw new TypeError('dependencies 应该是数组')
	}
	// 记忆逻辑
	if (memoArr[useMemoIndex]) {
		const [_memo, _dep] = memoArr[useMemoIndex]
		const isAllSame = dependencies && dependencies.length === _dep.length && dependencies.every(
			(item, i) => item === _dep[i])
		if (isAllSame) {
			useMemoIndex++

			return _memo
		} else {
			memoArr[useMemoIndex] = [calculate(), dependencies]
			useMemoIndex++
			return calculate()
		}
	} else {
		memoArr[useMemoIndex] = [calculate(), dependencies]
		useMemoIndex++
		return calculate()
	}
}

const callbackArray = []//[[cb,dep]],cb：回掉函数，dep：依赖
let callbackIndex = 0

export function useCallback(fn, dependencies) {
	if (typeof fn !== 'function') {
		throw new TypeError('回调函数要为函数')
	}
	if (dependencies && !Array.isArray(dependencies)) {
		throw new TypeError('dependencies 应该是数组')
	}
	if (callbackArray[callbackIndex]) {
		const [_memo, _dep] = callbackArray[callbackIndex]
		const isAllSame = dependencies && dependencies.length === _dep.length &&
			dependencies.every((item, i) => item === _dep[i]);
		if (isAllSame) {
			callbackIndex++
			return _memo
		} else {
			callbackArray[callbackIndex] = [fn, dependencies]
			callbackIndex++
			return fn
		}
	} else {
		callbackArray[callbackIndex] = [fn, dependencies]
		callbackIndex++
		return fn
	}
}

async function render() {
	const App = (await import('./app')).default;
	statesIndex = 0
	effectsIndex = 0
	useMemoIndex = 0
	callbackIndex = 0
	root.render(<App/>)
}
