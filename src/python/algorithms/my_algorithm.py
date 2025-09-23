from collections import deque, Counter
from typing import List, Optional

class Tree:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
#Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# class Tree:
#   def__init__(self,val,left=None,right=None):
#       self.val =val
#       self.left = left
#       self.right = right
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Algorithm:
    def __init__(self):
        print("Algorithm init")

    ## 广度优先遍历，子节点是否在同一层
    def list_to_tree(self, arr):
        if not arr:
            return None
        nodes = [Tree(val) if val is not None else None for val in arr]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids:
                    node.left = kids.pop()
                if kids:
                    node.right = kids.pop()
        return root

    def solve(self, root):
        if root is None:
            return True
        Q = deque([(root, 0)])  # 队列，存储节点和对应深度
        depths = set()
        while len(Q) > 0:
            cur, d = Q.popleft()
            if cur.left:
                Q.append((cur.left, d + 1))
            if cur.right:
                Q.append((cur.right, d + 1))
            if cur.left is None and cur.right is None:
                depths.add(d)
        return len(depths) == 1

    ##层序遍历
    def levelOrder(self, root):
        if root is None:
            return []
        res = []
        queue = deque([root])
        while queue:
            curLevel = []
            for _ in range(len(queue)):
                node = queue.popleft()
                curLevel.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            res.append(curLevel)
        return res

    ##在二叉搜索树中查找第 K 小的值
    def kthSmallest(self, root, k: int):
        res = []
        node = root
        count = 0
        while res or node:
            while node:
                res.append(node)  # append 在列表末尾添加节点
                node = node.left
            print([n.val for n in res])
            node = res.pop()
            print(node.val)
            count += 1
            if count == k:
                return node.val
            node = node.right

    ## 在二叉搜索树中查找第 K 大的值
    def kthMaxes(self, root, k: int):
        res = []
        node = root
        count = 0
        while res or node:
            while node:
                res.insert(0, node)  # insert 在列表指定位置插入节点
                node = node.right
            node = res.pop(0)  # pop() 移除并返回列表的一个节点，默认最后一个
            count += 1
            if count == k:
                return node.val
            node = node.left

    ## 回文数
    def isPalindrome(self, x: int) -> bool:
        s = str(x)
        lenJ, j = 0, len(s) - 1

        while lenJ < j:
            if s[j] != s[lenJ]:
                return False
            j -= 1
            lenJ += 1
        return True

    ## 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的 字母异位词。  s = "rat", t = "car" false
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        seen = dict()
        for i in s:
            seen[i] = seen.get(i, 0) + 1  # get 方法需要一个默认值，如果没有值就从0开始
        for i in t:
            if seen.get(i, 0) > 0:
                seen[i] = seen.get(i, 0) - 1
            else:
                return False
        return True

    def isAnagramWithCounter(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)  # 自动转字典并支持多个方法

    #
    def sortArray(self, nums: List[int]) -> List[int]:
        if len(nums) <= 1:
            return nums
        mid = len(nums) // 2
        leftArr = self.sortArray(nums[:mid])
        rightArr = self.sortArray(nums[mid:])
        return self.mergeArray(leftArr, rightArr)

    def mergeArray(self, leftArr: List[int], rightArr: List[int]) -> List[int]:
        result = []
        leftI = r = 0
        while leftI < len(leftArr) and r < len(rightArr):
            if leftArr[leftI] < rightArr[r]:
                result.append(leftArr[leftI])
                leftI += 1
            else:
                result.append(rightArr[r])
                r += 1
        result.extend(leftArr[leftI:])
        result.extend(rightArr[r:])
        return result

    def makeGood(self, s: str) -> str:
        stack = []
        for temp in s:
            if stack and stack[-1].lower() == temp.lower() and stack[-1] != temp:
                stack.pop()
            else:
                stack.append(temp)
        return "".join(stack)
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        f=s=head##快慢指针，一个走一步一个两步
        while f and f.next:
            s = s.next
            f = f.next.next
        return s


class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        print("KthLargest init")
        self.num = nums
        self.k = k

    def add(self, val: int) -> int:
        self.num.append(val)
        self.num = sorted(self.num, reverse=True)
        return self.num[self.k - 1]
