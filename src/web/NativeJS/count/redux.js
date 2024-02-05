const redux = {}
const cbs = []
export function createStore(reducer) {
    createReduxState(reducer)
    const getState = createGetter(reducer)
    const dispatch = createDispatch(reducer)
    return {
        subscribe,
        dispatch,
        getState
    }
}
function createReduxState(reducer) {
    let _state = reducer()
    Object.defineProperty(redux, '_state', {
        get() {
            return _state
        },
        set(nVal) {
            if (nVal === _state) return
            _state = nVal
            publish()
        }
    })

}
function createGetter(reducer) {
    return function () {
        return reducer(redux._state)
    }
}
function createDispatch(reducer) {
    return function (action) {
        redux._state =reducer(redux._state,action)
    }
}
function subscribe(cb) {
    if (cbs.includes(cb)) return
    cbs.push(cb)
}
function publish() {
    cbs.forEach(cb => cb())
}