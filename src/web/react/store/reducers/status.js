import statusState from "../state/status";
export default function status(state = { ...statusState }, action = {}) {
    const { type, payload } = action
    switch (type) {
        case 'FIELD':
            return {
                ...state,
                field: payload
            }
        default:
            return state
    }
}