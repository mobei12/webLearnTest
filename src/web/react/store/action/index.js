
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