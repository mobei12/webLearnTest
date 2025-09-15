/**
 * 二叉树的右视图
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
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function rightSideView(root: TreeNode | null): number[] {
  if (!root) return [];
  const res: Array<number> = [];
  const nodeQue: TreeNode[] = [root];
  while (nodeQue.length > 0) {
    let l = nodeQue.length;
    res.push(nodeQue[l - 1].val);
    for (let i = 0; i < l; i++) {
      const current = nodeQue.shift()!;
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
function DFSRightSideView(root:TreeNode|null):number[]{
  if(!root) return[]
  const res:Array<number>=[]
  const map = new Map()
  const dfs =(root:TreeNode|null,level=0)=>{
    if(!root) return 
    dfs(root.right,level+1)
    if(!map.has(level)){
      map.set(level,root.val)
    }
    dfs(root.left,level+1)

  }
  dfs(root)
  const arr = [...map.keys()].sort((a,b)=>a-b)
  arr.forEach(item=>{
    res.push(map.get(item))
  })
  return res
}
