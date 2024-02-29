function createWebWorker(fn) {
    if (typeof fn !== 'function') {
        throw new TypeError('fn must be a function');
    }
    const blob = new Blob(['(' + fn + ')()'], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    return worker;
}
const pollingWorker = createWebWorker(function (e) {
    let cache
    let interval = setInterval(() => {
        fetch('/my-api-endpoint').then(function (res) {
            const data = res.json();
            if (!compare(data, cache)) {
                cache = data;
                self.postMessage(data);
            }
        })
    }, 1000)
})

function compare(a, b) {
    for (let key in a) {
        if (a[key] !== b[key]) {
            return false
        }
    }
    return true
}

pollingWorker.onmessage = function (e) {
    console.log(e.data)
}
pollingWorker.terminate()
//TODO:做一个实例，和公共函数