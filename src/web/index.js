var arr2 = ['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
//排序成如下 ['4.3.5','4.3.4.5','2.3.3','0.302.1','0.1.1']


/**
 * 按指定顺序对给定的版本进行分类。
 *
 * @param {Array} arr - 版本数组
 * @param {string} order - 1升序，0降序
 * @return {Array} - The sorted array of versions.
 */
function sortVersion(arr, order = '1') {
    function sortIt(current, next) {
        const currentN = current.split('.').map(Number)
        const nextN = next.split('.').map(Number)
        for (let i = 0; i < Math.max(currentN.length, nextN.length); i++) {
            const num1 = i < currentN.length ? currentN[i] : 0;
            const num2 = i < nextN.length ? nextN[i] : 0;
            if (num1 !== num2) {
                return order === '1' ? num1 - num2 : num2 - num1
            }

        }
        return 0
    }
    return arr.sort(sortIt)
}
console.log(sortVersion(arr2, '-1'))