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
        case 'START':
            return {
                ...state,
                status: 'ING',
                timerNumber: payload.timerNumber,
                restNumber: payload.restNumber
            }
        case 'STOP':
            return {
                ...state,
                status: 'OFF',
                timerNumber: timerState.timerNumber,
                restNumber: timerState.restNumber
            }
        default:
            return state
    }
}