type TReactive<T> = {
    state: T
    on<K extends string & keyof T>(eventName: `${K}Update`, cb: (oldValue: T[keyof T], newValue: T[keyof T]) => void)
}
export default function reactive<T>(state: T): TReactive<T> {
    const events = new Map<keyof T, Array<(oldValue: T[keyof T], newValue: T[keyof T]) => void>>()
    const handler = {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            if (target[key] !== value) {
                if (!events.has(key)) {
                    events.set(key, [])
                }
                events.get(key)?.forEach(cb => cb(Reflect.get(target, key), value));
                Reflect.set(target, key, value);
            }
            return true
        }
    }
    const proxyO = new Proxy(state, handler)
    function on<K extends string & keyof T>(eventName: `${K}Update`, cb: (oldValue: T[keyof T], newValue: T[keyof T]) => void):void {
        const key = eventName.replace('Update', '') as keyof T
        if (!events.has(key)) {
            events.set(key, []);
        }
        events.get(key)?.push(cb);
    }

    return {
        state: proxyO,
        on
    }
}