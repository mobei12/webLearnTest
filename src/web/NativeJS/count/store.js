import reducer from "./reducer"
export const EventEnum = {
    PLUS: 'plus',
    MINUS: 'minus'
}
import { createStore } from './redux'

export default createStore(reducer)