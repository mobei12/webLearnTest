export function bindEvent(nodes, methods) {
    nodes.forEach(node => {
        const handlerName = node.getAttribute('@click')
        if (handlerName&&methods[handlerName]) {
            node.addEventListener('click', methods[handlerName].bind(this),false)
        }

    })

}