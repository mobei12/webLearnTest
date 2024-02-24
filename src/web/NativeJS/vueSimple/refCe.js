import { update } from './render.js'
/**
 * 创建具有默认值的响应式引用对象。
 *
 * @param {any} defaultVal - 引用的默认值
 * @return {object} 响应式引用对象
 */
function ref(defaultVal) {
    const obj = {
        deps: [],
        _value: defaultVal,
        defaultVal,
        $reset() {
            this.value = this.defaultVal
        }
    }
    Object.defineProperty(obj, 'value', {
        get() {
            return obj._value
        },
        set(nVal) {
            obj._value = nVal
            update({ deps: obj.deps, value: obj._value })
        }
    })
    return obj
}
function reactive(){
    
}
const reg_var = /\{\{(.+?)\}\}/

/**
 * 通过遍历节点并根据每个节点的内容更新引用对象，创建一个引用集合。
 *
 * @param {Object} ref - 要更新的引用对象
 * @param {Array} nodes - 要遍历的节点数组
 * @return {Object} 更新后的引用对象
 */
function createRefSet(ref, nodes) {
    nodes.forEach(node => {
        if (reg_var.test(node.textContent)) {
            const refKey = node.textContent.match(reg_var)[1].trim()
            ref[refKey].deps.push(node)
        }
    })
    return ref

}
export { createRefSet, ref,reactive }