package main

import (
	"myGoLang/myAlgorithms"
)

func main() {
	root := &myAlgorithms.TreeNode{
		Val: 1,
		Left: &myAlgorithms.TreeNode{
			Val: 2,
			Right: &myAlgorithms.TreeNode{
				Val: 5,
			},
		},
		Right: &myAlgorithms.TreeNode{
			Val: 3,
			Right: &myAlgorithms.TreeNode{
				Val: 4,
			},
		},
	}
	println(myAlgorithms.DFSRightSideView(root))
}
