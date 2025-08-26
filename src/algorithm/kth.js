//二叉搜索树中，对于任意一个节点，其左子树中所有节点的值都小于该节点的值，对于任意一个节点，其右子树中所有节点的值都大于该节点的值，它的左、右子树也分别是二叉搜索树（这个规则是递归定义的）
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
//在二叉搜索树中查找第 K 小的值
var kthSmallest = function (root, k) {
  let res = [],
    node = root,
    count = 0;
  while (res.length > 0 || node) {
    while (node) {
      res.push(node);
      node = node.left;
    }
    node = res.pop();
    count += 1;
    if (count === k) {
      return node.val;
    }
    node = node.right;
  }
};
//在二叉搜索树中查找第 K 大的值
var kthMaxes = function (root, k) {
  let res = [],
    node = root,
    count = 0;
  while (res.length > 0 || node) {
    while (node) {
      res.unshift(node);
      node = node.right;
    }
    node = res.shift();
    count += 1;
    if (count === k) {
      return node.val;
    }
    node = node.left;
  }
};
