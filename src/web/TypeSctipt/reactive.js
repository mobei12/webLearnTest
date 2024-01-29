export default function reactive(state) {
    const events = new Map()
    const handler = {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            if (target[key] !== value) {
                if (!events.has(key)) {
                    events.set(key, [])
                }
                events.get(key).forEach(cb => cb(Reflect.get(target, key), value));
                Reflect.set(target, key, value);
            }
            return true
        }
    }
    const proxyO = new Proxy(state, handler);
    function on(eventName, cb) {
        const key = eventName.replace('Update', '')
        if (!events.has(key)) {
            events.set(key, []);
        }
        events.get(key).push(cb);
    }
    return {
        state: proxyO,
        on
    }
}
