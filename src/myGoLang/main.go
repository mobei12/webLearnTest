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
	arr := []string{"eat", "tea", "tan", "ate", "nat", "bat"}
	fmt.Printf("%v\n", myAlgorithms.GroupAnagrams(arr)) // [1 2 3 4 5]

}
