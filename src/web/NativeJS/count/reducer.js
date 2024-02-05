import initState from './state'
import { EventEnum } from './store'
/**
 * 一个根据动作类型作为状态更新的reducer函数。
 * @param {any} state - 当前状态
 * @param {Object} action - 动作对象
 * @return {Object} 基于动作类型更新后的状态
 */
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