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
console.log(sortedArrayToBST([-10, -3, 0, 5, 9]))
