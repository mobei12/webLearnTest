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
 * @param {*} obj
 * @return  {String}
 **/
function getInit(target) {
    const Ctor = target.constructor
    return new Ctor()
}
/**
 * @desc 判断是否为对象
 * @param {*} obj
 * @return  {String}
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
 * @param {Array} arr 
 * @param {Number} deep
 * @return  {Array}
 **/
function clone(target) {
}
/**
 * @desc 解析url参数为对象 https://www.google.com/search?client=firefox-b-d&q=js+%E6%97%A0%E7%A9%B7%E5%A4%A7
 * @param {string} url 
 * @return  {Object}
 **/
function parseParam(url) {
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
 * @param {Function} func
 * @param {Number} wait
 * @param {Boolean} immediate
 * @return  {Function}
 **/
function debounce(params) {

}
/**
 * @desc 函数节流 触发高频事件，且 N 秒内只执行一次。
 * @param {Function} func
 * @param {Number} wait
 * @param {Object} options
 * @return  {Function}
 **/
function throttle(params) {

}

module.exports = {
    typeOf,
    getInit,
    isObject,
    flatten,
    debounce,
    parseParam
}