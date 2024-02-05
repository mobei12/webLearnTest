import initState from './state'
import { EventEnum } from './store'
export default function reducer(state = initState, action = {}) {
    switch (action.type) {
        case EventEnum.PLUS:
            return {
                count:state.count+1
            }
        case EventEnum.MINUS:
            return {
                count:state.count-1
            }
        default:
            return state
    }
}