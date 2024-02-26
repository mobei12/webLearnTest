import { combineReducers } from 'redux'
import counter from './counter'
import product from './product'
import intermittentTimer from './intermittentTimer'
export default combineReducers(
    {
        counter,product,intermittentTimer
    }
)