/**
 * 现给定一个对象或数组 obj，返回一个 精简对象 。精简对象 与原始对象相同，只是将包含 假 值的键移除。该操作适用于对象及其嵌套对象。数组被视为索引作为键的对象。当 Boolean(value) 返回 false 时，值被视为 假 值。

你可以假设 obj 是 JSON.parse 的输出结果。换句话说，它是有效的 JSON。
输入：obj = {"a": null, "b": [false, 1]}
输出：{"b": [1]}
解释：obj["a"] 和 obj["b"][0] 包含假值，因此被移除。
输入：obj = [null, 0, 5, [0], [false, 16]]
输出：[5, [], [16]]
解释：obj[0], obj[1], obj[3][0], 和 obj[4][0] 包含假值，因此被移除。
 */
/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {
    if (Array.isArray(obj)) {
        // 处理数组
        return obj
            .map(item => (typeof item === 'object' ? compactObject(item) : item))
            .filter(Boolean);
    } else if (typeof obj === 'object' && obj !== null) {
        // 处理对象
        return Object.entries(obj).reduce((acc, [key, value]) => {
            if (value && typeof value === 'object') {
                const compactedValue = compactObject(value);
                if (Object.keys(compactedValue).length > 0) {
                    acc[key] = compactedValue;
                }
            } else if (Boolean(value)) {
                acc[key] = value;
            }
            return acc;
        }, {});
    }
    return obj;
};
const obj = { "a": null, "b": [false, 1] }

console.log(Boolean(false))
console.log(compactObject(obj))
