import timerState from '../state/intermittentTimer'
export default function timerReducer(state = { ...timerState }, action = {}) {
    const { type, payload } = action
    switch (type) {
        case 'REST':
            return {
                ...state,
                timerNumber: 1
            }
        case 'SET':
            return {
                ...state,
                payload,
            }
        default:
            return state
    }
}