package main

import (
	"fmt"
	"slices"
)

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

// 在二叉搜索树中查找第 K 小的值
func kthSmallest(root *TreeNode, k int) int {
	var stack []*TreeNode
	node := root
	count := 0
	for node != nil || len(stack) > 0 { // 中序遍历
		for node != nil {
			stack = append(stack, node)
			node = node.Left
		}
		node = stack[len(stack)-1]   // 取出栈顶元素
		stack = stack[:len(stack)-1] //更新栈
		count += 1
		if count == k {
			return node.Val
		}
		node = node.Right
	}
	return -1
}

// 斐波那契数列
func fib(n int) int {
	if n < 2 {
		return n
	}
	a, b := 1, 1
	for i := 2; i <= n; i++ {
		a, b = b, a+b
	}
	return a
}

func finalString(s string) string {
	q := [2][]byte{} // 两个 slice 背靠背，q[0] 向左，q[1] 向右
	dir := 1
	for _, c := range s {
		if c == 'i' {
			dir ^= 1 // 修改添加方向,按位异或
		} else {
			q[dir] = append(q[dir], byte(c))
		}
	}
	fmt.Println(q)
	slices.Reverse(q[dir^1])
	return string(append(q[dir^1], q[dir]...))
}
func main() {
	str := "striacing"
	fmt.Printf(finalString(str))
}
