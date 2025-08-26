package main

import "fmt"

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

//在二叉搜索树中查找第 K 小的值
func kthSmallest(root *TreeNode, k int) int {
	var stack []*TreeNode
	node := root
	count := 0
	for node != nil || len(stack) > 0 {
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		count += 1
		if count == k {
			return node.Val
		}
		node = node.Right
	}
	return -1

}

func main() {
	root := &TreeNode{Val: 8}
	root.Left = &TreeNode{Val: 3}
	root.Right = &TreeNode{Val: 10}
	root.Left.Left = &TreeNode{Val: 1}
	root.Left.Right = &TreeNode{Val: 6}
	root.Left.Right.Left = &TreeNode{Val: 4}
	root.Left.Right.Right = &TreeNode{Val: 7}
	root.Right.Right = &TreeNode{Val: 14}
	fmt.Println(kthSmallest(root, 3)) // 3
}
