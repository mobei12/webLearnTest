package myAlgorithms

import (
	"fmt"
	"slices"
	"sort"
	"strings"
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
func KthSmallest(root *TreeNode, k int) int {
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
func Fib(n int) int {
	if n < 2 {
		return n
	}
	a, b := 1, 1
	for i := 2; i <= n; i++ {
		a, b = b, a+b
	}
	return a
}

// https://leetcode.cn/problems/jump-game-iii/
func DFSCanReach(arr []int, start int) bool {
	seen := make(map[int]bool)
	var dfs func(int) bool
	dfs = func(i int) bool {
		if i < 0 || i >= len(arr) {
			return false
		}
		if arr[i] == 0 {
			return true
		}
		if seen[i] {
			return false
		}
		seen[i] = true
		return dfs(i-arr[i]) || dfs(i+arr[i])
	}
	return dfs(start)
}
func BFSCanReach(arr []int, start int) bool {
	seen := make(map[int]bool)
	query := []int{start}
	for 0 < len(query) {
		current := query[0]
		query = query[1:]
		if arr[current] == 0 {
			return true
		}
		for _, v := range [2]int{-1, 1} {
			nx := current + arr[current]*v
			if 0 <= nx && nx < len(arr) && !seen[nx] {
				query = append(query, int(nx))
				seen[nx] = true
			}
		}
	}
	return false
}
func FinalString(s string) string { //输入string，输出rtsng
	q := [2][]byte{} // 两个 slice 背靠背，q[0] 向左，q[1] 向右
	dir := 1
	for _, c := range s {
		if c == 'i' {
			dir ^= 1 // 修改添加方向,按位异或
		} else {
			q[dir] = append(q[dir], byte(c))
		}
	}
	slices.Reverse(q[dir^1])
	return string(append(q[dir^1], q[dir]...))
}
func Anagram(s string, t string) bool {
	if len(s) != len(t) {
		return false
	}
	seen := make(map[rune]int) //用map缓存到过的下标
	for _, v := range s {
		seen[v]++
	}
	for _, v := range t {
		if va := seen[v]; va > 0 {
			seen[v]--
		} else {
			return false
		}
	}
	return true
}

// 归并排序数组
func SortArray(nums []int) []int {
	if len(nums) <= 1 {
		return nums
	}
	mid := len(nums) / 2
	left := SortArray(nums[:mid])
	right := SortArray(nums[mid:])
	return mergeArray(left, right)
}
func mergeArray(leftA []int, rightA []int) []int {
	result := make([]int, 0, len(leftA)+len(rightA))
	l, r := 0, 0
	for l < len(leftA) && r < len(rightA) {
		if leftA[l] <= rightA[r] {
			result = append(result, leftA[l])
			l++
		} else {
			result = append(result, rightA[r])
			r++
		}
	}
	result = append(append(result, leftA[l:]...), rightA[r:]...)
	return result
}

// 罗马数字转整数
func RomanToInt(s string) int {

	dict := map[string]int{
		"I":  1,
		"V":  5,
		"X":  10,
		"L":  50,
		"C":  100,
		"D":  500,
		"M":  1000,
		"IV": 4,
		"IX": 9,
		"XL": 40,
		"XC": 90,
		"CD": 400,
		"CM": 900,
	}
	runes := []rune(s)
	sum := 0
	for i := 0; i < len(runes); {
		v := string(runes[i])
		if string(v) == "I" || string(v) == "X" || string(v) == "C" {
			if i+1 < len(runes) {
				temp := v + string(runes[i+1])
				fmt.Println(temp)
				if val, ok := dict[temp]; ok {
					sum += val
					i += 1
				} else {
					sum += dict[v]
				}
			}
		} else {
			sum += dict[v]
		}
		i += 1
	}

	return sum
}
func IsValidParentheses(s string) bool {
	validVal := []string{}
	sLeft := "[({"
	for _, v := range s {
		vString := string(v)
		if strings.Contains(sLeft, vString) {
			validVal = append(validVal, vString)
		} else if len(validVal) == 0 {
			return false
		} else {
			str := validVal[len(validVal)-1]
			if (vString == ")" && str == "(") || (vString == "}" && str == "{") || (vString == "]" && str == "[") {
				validVal = validVal[:len(validVal)-1]
			} else {
				return false
			}
		}
	}
	return len(validVal) == 0
}

// 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
func RightSideView(root *TreeNode) []int {
	if root == nil {
		return nil
	}
	result := []int{}
	nodeQue := []*TreeNode{root} // 创建并把根目录放在队列里
	for len(nodeQue) > 0 {       //采用广度优先遍历暨层序遍历，
		n := len(nodeQue)
		result = append(result, nodeQue[n-1].Val) //取每一层最右边的数据返回
		for i := 0; i < n; i++ {
			current := nodeQue[0]
			nodeQue = nodeQue[1:]
			if current.Left != nil {
				nodeQue = append(nodeQue, current.Left) //把每一个节点的子节点按照顺序放入队列，方便下一次循环使用
			}
			if current.Right != nil {
				nodeQue = append(nodeQue, current.Right)
			}
		}
	}
	return result
}
func DFSRightSideView(root *TreeNode) []int {
	resMap := make(map[int]int)             //保存要返回的数据，key为层，value为每一层最右的数据
	var dfs func(root *TreeNode, level int) //深度优先
	dfs = func(root *TreeNode, level int) {
		if root == nil {
			return
		}
		dfs(root.Right, level+1)         //使用右左中遍历
		if _, ok := resMap[level]; !ok { //右边不存在则用中间或者左边
			resMap[level] = root.Val
		}
		dfs(root.Left, level+1)
	}
	dfs(root, 0)
	keys := make([]int, 0, len(resMap))
	for key := range resMap {
		keys = append(keys, key)
	}
	sort.Ints(keys)
	res := make([]int, 0, len(keys))
	for _, val := range keys {
		res = append(res, resMap[val])
	}
	return res
}
