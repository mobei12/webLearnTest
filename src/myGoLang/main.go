package main

import (
	"fmt"
	"myGoLang/myAlgorithms"
)

func main() {
	/* 	root := &myAlgorithms.TreeNode{
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
	} */
	arr := []int{0, 1, 0, 3, 2, 3}
	fmt.Printf("%v\n", myAlgorithms.LengthOfLog(arr)) // [1 2 3 4 5]
}
