import { combineReducers } from 'redux'
import counter from './counter'
import product from './product'
export default combineReducers(
    {
        counter,product
    }
)