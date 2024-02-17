import { createRoot } from 'react-dom/client'
export const root = createRoot(document.getElementById('test'))
const states = []
const stateSetters = []
let index = 0
export function useState(initVal) {
    states[index] = createState(initVal, index)
    stateSetters.push(createStateSetter(index))
    const _state = states[index]
    const _setState = stateSetters[index]
    index++
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
async function render() {
    const App = (await import('./app')).default;
    index = 0
    root.render(<App />)
}