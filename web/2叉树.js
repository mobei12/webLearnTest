function TreeNode(val, left, right) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
}

/**
 * @param {number[]} numbs
 * @return {TreeNode}
 */
var sortedArrayToBST = function (numbs) {
    if (numbs.length === 0) return null
    let mid = Math.floor(numbs.length / 2)
    let root = new TreeNode(numbs[mid])
    console.log(root)
    root.left = sortedArrayToBST(numbs.slice(0, mid))
    root.right = sortedArrayToBST(numbs.slice(mid + 1))
    return root
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**前序和后续遍历
 * @param {TreeNode} root
 * @return {number}
 */
var ergodic = function (root) {
    if (!root) {
        return []; // 空节点返回空数组
    }
    let arr = []
    let stack = [root]
    let temp = null
    while (stack.length) {
        temp = stack.pop()
        if (temp.left) {
            stack.push(temp.left)
        }
        if (temp.right) {
            stack.push(temp.right)
        }
        arr.unshift(temp.val)
    }
    return  arr
};
/**前序和后续遍历
 * @param {TreeNode} root
 * @return {number}
 */
var ergodicCenter = function (root) {
    if (!root) {
        return []; // 空节点返回空数组
    }

};
console.log(ergodic([3, 9, 20, null, null, 15, 7]))
