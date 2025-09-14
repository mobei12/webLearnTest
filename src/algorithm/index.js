/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
var TreeNode = /** @class */ (function () {
    function TreeNode(val, left, right) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
    return TreeNode;
}());
function rightSideView(root) {
    if (!root)
        return [];
    var res = [];
    var nodeQue = [root];
    while (nodeQue.length > 0) {
        var l = nodeQue.length;
        res.push(nodeQue[l - 1].val);
        for (var i = 0; i < l; i++) {
            var current = nodeQue.shift();
            if (current.left !== null) {
                nodeQue.push(current.left);
            }
            if (current.right !== null) {
                nodeQue.push(current.right);
            }
        }
    }
    return res;
}
var root =
[1,2,3,null,5,null,4]
rightSideView(root)