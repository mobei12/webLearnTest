import counterState from '../state/counter'
export default function counter(state = { ...counterState }, action = {}) {
    const { type, payload } = action
    switch (type) {
        case 'PLUS':
            return {
                ...state,
                count: state.count + payload
            }
        case 'MINUS':
            return {
                ...state,
                count: state.count - payload
            }
        default:
            return state
    }
}