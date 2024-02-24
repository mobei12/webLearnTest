export function render(refSet) {
    for (const key in refSet) {
        const ref = refSet[key]
        _render(ref)
    }
}

/**
 * Update the value and trigger a re-render.
 *
 * @param {Object} deps - the dependencies for the update
 * @param {any} value - the new value to be updated
 */
export function update({ deps, value }) {
    _render({ deps, value })

}
/**
 * 将给定的值渲染到指定的依赖项上。
 *
 * @param {Array<Element>} deps - 要将值渲染到的 HTML 元素数组
 * @param {string} value - 要渲染到 HTML 元素的值
 * @return {void} 
 */
function _render({ deps, value }) {
    deps.forEach(element => {
        element.textContent = value
    });
}