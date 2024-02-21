export function render(refSet) {
    for (const key in refSet) {
        const ref = refSet[key]
        _render(ref)
    }
}
export function update({ deps, value }) {
    _render({ deps, value })
    
}
function _render({ deps, value }) {
    deps.forEach(element => {
        element.textContent = value
    });
}