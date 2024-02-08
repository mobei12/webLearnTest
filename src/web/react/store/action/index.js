
/**
 * 接受一个动作对象并返回一个具有类型和有效负载属性的对象的函数。
 *
 * @param {object} action - 动作对象
 * @return {object} 具有类型和有效负载属性的对象
 */
export function counterAction(action = {}) {
    const { type, payload } = action
    return {
        type,
        payload
    }
}
/**
 * 结合reduxThunk可以在action中执行异步操作
 *
 * @param {object} action - 要执行的动作。
 * @return {function} 在延迟后分派给定动作的函数。
 */
export function listAction(action = {}) {
    const { type, payload } = action
    return function (dispatch) {
        setTimeout(() => {
            dispatch({
                type,
                payload
            })
        }, 1000)
    }
}