import { update } from './render.js'
function ref(defaultVal) {
    const obj = {
        deps: [],
        _value: defaultVal,
        defaultVal,
        $reset() {
            this.value=this.defaultVal
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
const reg_var = /\{\{(.+?)\}\}/
function createRefSet(ref, nodes) {
    nodes.forEach(node => {
        if (reg_var.test(node.textContent)) {
            const refKey = node.textContent.match(reg_var)[1].trim()
            ref[refKey].deps.push(node)
        }
    })
    return ref

}
export { createRefSet, ref }