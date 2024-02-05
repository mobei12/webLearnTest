import reducer from "./reducer"

import { createStore } from './redux'
export const EventEnum = {
    PLUS: 'plus',
    MINUS: 'minus'
}
export default createStore(reducer)
