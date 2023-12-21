class EventEmitter {
    evnets = {}
    /**
     * @param {string} eventName
     * @param {Function} callback
     * @return {Object}
     */
    subscribe(eventName, callback) {
        if (this.evnets[eventName]) {
            this.evnets[eventName].push(callback)
        } else {
            this.evnets[eventName] = [callback]
        }
        return {
            unsubscribe: () => {
                this.evnets[eventName] = this.evnets[eventName].filter(item => item != callback)
                return undefined
            }
        };
    }

    /**
     * @param {string} eventName
     * @param {Array} args
     * @return {Array}
     */
    emit(eventName, args = []) {
        if (Array.isArray(this.evnets[eventName]) && (this.evnets[eventName]).length > 0) {
            return this.evnets[eventName].map(fn => fn(...args))
        }
        return []
    }
}

/**
 * const emitter = new EventEmitter();
 *
 * // Subscribe to the onClick event with onClickCallback
 * function onClickCallback() { return 99 }
 * const sub = emitter.subscribe('onClick', onClickCallback);
 *
 * emitter.emit('onClick'); // [99]
 * sub.unsubscribe(); // undefined
 * emitter.emit('onClick'); // []
 */
const events = new EventEmitter();
events.subscribe("dbClick", (arc) => {
    console.log(arc);
}, true);
events.emit("dbClick", 1, 2, 3, 4);
console.log(events.events)
events.emit("dbClick", 1, 2, 3, 4);