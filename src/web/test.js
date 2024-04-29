function throttleStamp(fn, time) {
    let timeStamp = 0
    return function () {
        const now = Date.now()
        const arg = arguments
        if (now - timeStamp > time) {
            fn.call(this, arg)
            timeStamp = now
        }
    }
}
function throttleTimer(fn, time) {
    let timer = null
    return function () {
        let arg = arguments, context = this;
        if (!timer) {
            fn.call(context, arg)

            timer = setTimeout(() => {
                timer = null
                fn(context, arg)
                clearTimeout(timer)
                arg = null
                context = null
            }, time)
        }
    }
}
function debounce(fn, time, immediate = false) {
    let timer = null
    return function (arg) {
        if (timer) clearTimeout(timer)
        if (immediate) {
            if (!timer) fn.apply(this, arg)
            timer = setTimeout(() => {
                clearTimeout(timer)
                timer = null
            },time)
        } else {
            timer = setTimeout(() => {
                fn.call(this, arg)
                clearTimeout(timer)
                timer = null
            },time)
        }
    }
}
export {
    throttleStamp,
    debounce,
    throttleTimer
}
