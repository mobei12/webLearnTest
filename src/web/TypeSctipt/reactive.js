export default function reactive(state) {
    const proxyO = {}, events = {}
    for (const key in state) {
        if (Object.hasOwnProperty.call(state, key)) {
            Object.defineProperties(proxyO, key, {
                get() {
                    return state[key]
                },
                set(nVal) {
                    events[key].forEach(cb => cb(state[key], nVal));
                    state[key] = nVal
                }
            })
        }
    }
    function on(eventName, cb) {
        const key = eventName.replace('Update', '')
        if (!events[key]) {
            events[key] = []
        }
        events[key].push(cb)
    }
    return {
        state: proxyO,
        on
    }
}
