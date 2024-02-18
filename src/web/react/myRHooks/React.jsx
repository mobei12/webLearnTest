import { createRoot } from 'react-dom/client'
export const root = createRoot(document.getElementById('test'))
const states = []
const stateSetters = []
let statesIndex = 0

const effects = []//[[1,2]] 二维数组
let effectsIndex = 0
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

    if (isChanged||dependencies===undefined) {
        setUp()
    }
    effects[effectsIndex] = dependencies
    effectsIndex++
}
async function render() {
    const App = (await import('./app')).default;
    statesIndex = 0
    effectsIndex = 0
    root.render(<App />)
}