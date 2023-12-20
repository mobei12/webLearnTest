/**
 * @param {Array} arr
 * @param {Function} fn
 * @return {Array}
 */
var sortBy = function(arr, fn) {
    const res = []
    arr.forEach(element => {
        res.push({id:fn(element),element})
    });
    res.sort((a,b)=> a.id-b.id)
    return res.map(el=> el.element)
};
const arr = [[3, 4], [5, 2], [10, 1]], fn = (x) => x[1]
console.log(sortBy(arr,fn))