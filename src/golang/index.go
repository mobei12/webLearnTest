package main

/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
type TreeNode struct {
	Val   int
	Left  *TreeNode
	Right *TreeNode
}

func levelOrder(root *TreeNode) [][]int {
	var res [][]int
	if root == nil {
		return res
	}
	queue := []*TreeNode{root} //用切片模拟队列，初始时只包含根节点。
	for len(queue) > 0 {       //只要队列不为空，就一直循环，每次循环处理一层
		size := len(queue)
		var level []int
		for i := 0; i < size; i++ { //遍历当前层的所有节点
			node := queue[0]                //取出队首节点
			queue = queue[1:]               //从队列中移除
			level = append(level, node.Val) //把当前节点的值加入本层的结果
			if node.Left != nil {
				queue = append(queue, node.Left)
			}
			if node.Right != nil {
				queue = append(queue, node.Right)
			}
		}
		res = append(res, level)
	}
	return res
}

func main() {
	a := [...]int{1, 2, 3, 4}
	b := a[0:3]
	for i := 0; i < len(b); i++ {
		println(b[i])
	}
}
