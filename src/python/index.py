import collections
from typing import Optional
from collections import deque
class Tree:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
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
class Solution:
    def list_to_tree(self, arr):
        if not arr:
            return None
        nodes = [Tree(val) if val is not None else None for val in arr]
        kids = nodes[::-1]
        root = kids.pop()
        for node in nodes:
            if node:
                if kids: node.left = kids.pop()
                if kids: node.right = kids.pop()
        return root
    ## 广度优先遍历，子节点是否在同一层
    def  solve(self,root):
        if root is None:
            return True
        Q = collections.deque([(root,0)]) #队列，存储节点和对应深度
        depths = set()
        while len(Q) > 0 :
            cur,d = Q.popleft()
            if cur.left:
                Q.append((cur.left,d+1))
            if cur.right:
                Q.append((cur.right,d+1))
            if cur.left is None and cur.right is None:
                depths.add(d)
        return len(depths) == 1
    ##层序遍历
    def levelOrder(self, root):
        if root is None:
            return []
        res = []
        queue = collections.deque([root])
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
                res.append(node) #append 在列表末尾添加节点
                node = node.left
            print([n.val for n in res])
            node = res.pop()
            print(node.val)
            count += 1
            if count==k:
                return node.val
            node = node.right
    ## 在二叉搜索树中查找第 K 大的值
    def kthMaxes(self,root,k:int):
        res = []
        node = root
        count = 0
        while res or node:
            while node:
                res.insert(0,node)#insert 在列表指定位置插入节点
                node = node.right
            node = res.pop(0) #pop() 移除并返回列表的一个节点，默认最后一个
            count += 1
            if count==k:
                return node.val
            node = node.left
    ## 回文数
    def isPalindrome(self,x:int)->bool:
        s= str(x)
        l,j= 0,len(s)-1

        while l<j:
            if s[j] != s[l]:
                return False
            j -=1
            l +=1
        return True
    
sol = Solution()
# Construct the binary tree: [3,1,4,None,2]
num =12332
print(sol.isPalindrome(num))
