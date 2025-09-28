package myAlgorithms

import (
	"fmt"
	"math"
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

func BubbleSort(arr []int) []int {
	l := len(arr)
	if len(arr) < 2 {
		return arr
	}
	for i := 0; i < l-1; i++ {
		swapped := false
		for j := 0; j < l-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
				swapped = true
			}
		}
		if !swapped {
			break
		}
	}
	return arr
}
func quickSort(nums []int) []int {
	if len(nums) < 2 {
		return nums
	}
	leftArr, rightArr, midArr, mid := []int{}, []int{}, []int{}, len(nums)/2
	for i := 0; i < len(nums); i++ {
		if nums[i] < nums[mid] {
			leftArr = append(leftArr, nums[i])
		} else if nums[i] > nums[mid] {
			rightArr = append(rightArr, nums[i])
		} else {
			midArr = append(midArr, nums[i])
		}
	}
	return append(append(quickSort(leftArr), nums[mid]), quickSort(rightArr)...)
}

// 正整数基数排序
func RADSort(nums []int) []int {
	if len(nums) == 0 {
		return nums
	}

	// 计算最大值（用于决定循环轮数）
	maxVal := nums[0]
	for _, v := range nums {
		if v > maxVal {
			maxVal = v
		}
	}

	barrels := make([][]int, 10)
	numsL := len(nums)

	// 从个位开始，按位处理，直到 maxVal/divisor == 0 为止
	for divisor := 1; maxVal/divisor > 0; divisor *= 10 {
		// 分桶
		for _, val := range nums {
			index := (val / divisor) % 10
			barrels[index] = append(barrels[index], val)
		}

		// 收集并清空桶
		newNums := make([]int, 0, numsL)
		for i := 0; i < 10; i++ {
			if len(barrels[i]) > 0 {
				newNums = append(newNums, barrels[i]...)
				barrels[i] = barrels[i][:0]
			}
		}
		nums = newNums
	}
	return nums
}

/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
type ListNode struct {
	Val  int
	Next *ListNode
}

// 链表中间节点
func MiddleNode(head *ListNode) *ListNode {
	f, s := head, head
	for f != nil && f.Next != nil {
		f = f.Next.Next
		s = s.Next
	}
	return s
}

// 数组最大子序和（Kadane’s 算法）
func MaxSubArray(nums []int) int {
	cur, res := 0, -math.MaxInt
	for _, i := range nums {
		if i > cur+i { //如果当前累加和小于当前数字，则用当前数字重置累加和
			cur = i
		} else {
			cur = cur + i
		}
		if cur > res {
			res = cur
		}
	}
	return res
}

// 买卖股票（Kadane’s 算法）
func MaxProfit(prices []int) int {
	if len(prices) <= 1 {
		return 0
	}
	cur, res := 0, 0
	for i := 1; i < len(prices); i++ {
		temp := prices[i] - prices[i-1]
		fmt.Println(temp, cur, res)
		if cur+temp > 0 { //和大于0累加
			cur = temp + cur
		} else { //小于等于0，重置当前cur
			cur = 0
		}
		if cur > res {
			res = cur
		}
	}
	return res
}

// 字母异位词分组
func GroupAnagrams(strs []string) [][]string {
	ans := make(map[string][]string)

	for _, val := range strs {
		// 用 [26]int 统计字母频次
		var d [26]int
		for i := 0; i < len(val); i++ {
			d[val[i]-'a']++
		}

		// 把数组转成 string 作为 key
		// fmt.Sprint(d) 也行，但会多空格，这里直接手写序列化
		key := make([]byte, 0, 26*2)
		for _, count := range d {
			key = append(key, byte(count), ',')
		}

		ans[string(key)] = append(ans[string(key)], val)
	}

	// map 转 slice
	res := make([][]string, 0, len(ans))
	for _, v := range ans {
		res = append(res, v)
	}
	return res
}

// [最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)
func LengthOfLIS(nums []int) int {
	nL := len(nums)
	dp := make([]int, nL)

	for i := range nL {
		for j := range i {
			if nums[j] < nums[i] {
				dp[i] = max(dp[i], (dp[j] + 1))
			}
		}
	}
	return slices.Max(dp) + 1
}

/*
O(N*logN)
2分➕贪心算法
输入：0, 1, 0, 3, 2, 3
输出：
[0]
[0 1]
[0 1]
[0 1 3]
[0 1 2]
[0 1 2 3]
*/
func LengthOfLog(nums []int) int {
	var dp []int
	for _, num := range nums {
		//下标对应的数，小于当前index，就直接替换，等于就加入
		i := sort.Search(len(dp), func(i int) bool { // 找到第一个 >= num 的位置 (bisect_left)
			return dp[i] >= num
		})
		if i == len(dp) { //dp切片长度等于i，说明要往后面加
			dp = append(dp, num)
		} else {
			dp[i] = num
		}
	}
	return len(dp)
}
func TwoOutOfThree(nums1 []int, nums2 []int, nums3 []int) []int {
	var ans []int
	mapD := make(map[int]int)
	for _, i := range nums1 {
		if va := mapD[i]; va == 0 {
			mapD[i] = 1
		}
	}
	mapD1 := make(map[int]int)
	for _, i := range nums2 {
		if va := mapD1[i]; va == 0 {
			mapD1[i] = 1
		}
	}
	mapD2 := make(map[int]int)
	for _, i := range nums3 {
		if va := mapD2[i]; va == 0 {
			mapD2[i] = 1
		}
	}
	for key, v := range mapD1 {
		if _, ok := mapD[key]; ok {
			mapD[key] += 1
		} else {
			mapD[key] = v
		}
	}
	for key, v := range mapD2 {
		if _, ok := mapD[key]; ok {
			mapD[key] += 1
		} else {
			mapD[key] = v
		}
	}

	for key, v := range mapD {
		if v >= 2 {
			ans = append(ans, key)
		}
	}
	return ans

}

// 1480. 一维数组的动态和
func RunningSum(nums []int) []int {
	total := 0
	ans := make([]int, len(nums))
	for i, val := range nums {
		total += val
		ans[i] = total
	}
	return ans
}

// LCR 119. 最长连续序列
func LongestConsecutive(nums []int) int {
	temp := RADSort(nums)
	maxNumber := 1
	leftIndex := 0
	repeat := 0
	for i := 1; i < len(temp); i++ {
		fmt.Println(temp[i-1], temp[i])
		if temp[i]-temp[i-1] > 1 {
			leftIndex = i
			repeat = 0
		} else if temp[i]-temp[i-1] == 0 {
			repeat += 1
		} else {
			if i-leftIndex+1-repeat > maxNumber {
				maxNumber = i - leftIndex - repeat + 1
			}
		}

	}
	return maxNumber
}

// 整理字符串1544
func MakeGood(s string) string {
	if len(s) < 2 {
		return s
	}
	i := 0
	for i < len(s)-1 {
		beforeS := strings.ToLower(string(s[i]))
		afterS := strings.ToLower(string(s[i+1]))
		if beforeS == afterS && s[i] != s[i+1] {
			// 删除这一对字符
			s = s[:i] + s[i+2:]
			// 回退一位，避免漏掉情况
			if i > 0 {
				i--
			}
		} else {
			i++
		}
	}
	return s
}
