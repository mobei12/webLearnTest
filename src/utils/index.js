/**
 * Created by moBei on 2024/1/7
 */

/**
 * @desc 类型判断
 * @param {*} obj
 * @return  {String}
 **/
function typeOf(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * @desc  获取构造函数实例
 * @param {*} target
 * @return  {String}
 **/
function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}

/**
 * @desc 判断是否为对象
 * @param {*} target
 * @return  {Boolean}
 **/
function isObject(target) {
    const type = typeof target
    return target !== null && (type === 'object' || type === 'function')
}

/**
 * @desc 数组降维
 * @param {Array} arr
 * @param {Number} deep
 * @return  {Array}
 **/
function flatten(arr, deep = Infinity) {
    if (typeOf(arr) !== 'array') throw new Error('请传入正确的数组！')
    var result = []
    for (var i = 0; i < arr.length; i++) {
        if (typeOf(arr[i]) === 'array' && deep > 0) {
            result = result.concat(flatten(arr[i], deep - 1))
        } else {
            result.push(arr[i])
        }
    }
    return result
}

/**
 * @desc 对象克隆
 * @param {object} target
 * @return  {object}
 **/
function cloneSimple(target) {
    if (!isObject(target)) return
    const resultObj = target instanceof Array ? [] : {}
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            resultObj[key] = target[key]
        }
    }
    return resultObj
}

/**
 * @desc 对象克隆
 * @param {object} target
 * @return  {object}
 **/
function deepClone(target) {
    if (!isObject(target)) return
    const resultObj = target instanceof Array ? [] : {}
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            if (isObject(target)) {
                resultObj[key] = deepClone(target[key])
            } else {
                resultObj[key] = target[key]
            }
        }
    }
    return resultObj
}

/**
 * @desc 对象克隆
 * @param {object} target
 * @param {WeakMap} map 缓存
 * @return  {object}
 **/
function wholeDeepClone(target, map = new WeakMap()) {
    if (map.get(target)) return target
    const constructor = target.constructor
    if (/^(RegExp|Date)$/i.test(constructor.name)) {
        // 创建一个新的特殊对象(正则类/日期类)的实例
        return new constructor(target);
    }
    if (!isObject(target)) return target
    map.set(target, true)//防止循环引用
    const resultObj = target instanceof Array ? [] : {}
    for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            resultObj[key] = wholeDeepClone(target[key])
        }
    }
    return resultObj
}

/**
 * @desc 解析url参数为对象 https://www.google.com/search?client=firefox-b-d&q=js+%E6%97%A0%E7%A9%B7%E5%A4%A7
 * @param {string} url
 * @return  {Object}
 **/
function parseParam(url) {
    const regExpUrl = /^https?:\/\/([a-zA-Z0-9_-]+\.?)*(:\d+)?(\/([a-zA-Z0-9_.\-~:/?#[\]@!$&'()*+,;=]+)?)?$/

    if (!regExpUrl.test(url)) throw new Error('请传入正确的url！')
    const paramsStr = url.split('?')// 将 ? 后面的字符串取出来
    if (!paramsStr[1]) return {}
    const paramsArr = paramsStr[1].split('&')
    if (typeOf(paramsArr) !== 'array' || paramsArr.length === 0) return {}

    const obj = {}
    paramsArr.forEach(item => {
        if (/=/.test(item)) {
            let [key, value] = item.split('=')
            if (key && value) {
                value = decodeURIComponent(value); // 解码
                value = /^\d+$/.test(value) ? parseFloat(value) : value; // 判断是否转为数字
                if (obj[key]) {
                    obj[key] = [].concat(obj[key], value)
                } else {
                    obj[key] = value
                }
            }
        }
    })
    return obj
}

/**
 * @desc 函数防抖 触发高频事件 N 秒后只会执行一次，如果 N 秒内事件再次触发，则会重新计时。
 * @param {Function} func 需要执行的函数
 * @param {Number} wait 执行间隔时间
 * @param {Boolean} immediate   是否立即执行
 * @return  {Function}
 **/
function debounce(func, wait, immediate) {
    var timeout, result;

    var debounced = function () {
        var context = this;
        var args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout;
            timeout = setTimeout(function () {
                timeout = null;
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
}

/**
 * @desc 函数节流 触发高频事件，且 N 秒内只执行一次。
 * @param {Function} func 需要执行的函数
 * @param {Number} wait 执行间隔时间
 * @return  {Function}
 **/
function throttle(func, wait) {
    var context, args;
    var previous = 0;

    var throttled = function () {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
    throttled.cancel = function () {
        previous = 0;
    }
    return throttled
}


/**
 * @desc 函数柯里化
 * @param {Function} fn
 * @return  {Function}
 **/
function curry(fn) {
    let judge = (...args) => {
        if (args.length === fn.length) return fn(...args)
        return (...arg) => judge(...args, ...arg)
    }
    return judge
}
/**
 * @desc jsonp跨域
 * @param {Object} {url,params, callbackName}
 * @return  {Promise}
 **/
const jsonp = ({ url, params, callbackName }) => {
    const generateUrl = () => {
        let dataSrc = ''
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }
        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }
    return new Promise((resolve, reject) => {
        const scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            resolve(data)
            document.removeChild(scriptEle)
        }
    })
}



module.exports = {
    typeOf,
    getInit,
    isObject,
    flatten,
    debounce,
    throttle,
    parseParam,
    cloneSimple,
    deepClone,
    wholeDeepClone,
    curry,
    jsonp
}
