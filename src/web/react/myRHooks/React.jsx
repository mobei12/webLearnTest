import { createRoot } from 'react-dom/client'
export const root = createRoot(document.getElementById('test'))
const states = []
const stateSetters = []
let statesIndex = 0

export function useState(initVal) {
    states[statesIndex] = createState(initVal, statesIndex)
    stateSetters.push(createStateSetter(statesIndex))
    const _state = states[statesIndex]
    const _setState = stateSetters[statesIndex]
    statesIndex++
    return [_state, _setState]
}
function createState(initVal, index) {
    return states[index] ? states[index] : initVal
}
function createStateSetter(index) {
    return (newVal) => {
        if (typeof newVal === 'function') {
            states[index] = newVal(states[index])
        } else {
            states[index] = newVal
        }
        render()
    }
}
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
export function useEffect(setUp, dependencies) {
    if (typeof setUp !== "function") {
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
let memoI = 0
/**
 * 根据依赖项对函数调用的结果进行记忆
 * @param {Function} calculate - 要进行记忆的函数
 * @param {Array} dependencies - 函数的依赖项
 * @returns {*} - 函数的记忆结果
 */
export function useMemo(calculate, dependencies) {
    // 验证输入类型
    if (typeof calculate !== "function") {
        throw new TypeError('回调函数要为函数')
    }
    if (dependencies && !Array.isArray(dependencies)) {
        throw new TypeError('dependencies 应该是数组')
    }
    // 记忆逻辑
    if (memoArr[memoI]) {
        const [_memo, _dep] = memoArr[memoI]
        const isAllSame = dependencies && dependencies.length === _dep.length && dependencies.every((item, i) => item === _dep[i])
        if (isAllSame) {
            memoI++

            return _memo
        } else {
            memoArr[memoI] = [calculate(), dependencies]
            memoI++
            return calculate()
        }
    } else {
        memoArr[memoI] = [calculate(), dependencies]
        memoI++
        return calculate()
    }
}
const callbackArray = []//[[cb,dep]],cb：回掉函数，dep：依赖
let callbackIndex = 0
export function useCallback(fn, dependencies) {
    if (typeof fn !== "function") {
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
    memoI = 0
    callbackIndex = 0
    root.render(<App />)
}