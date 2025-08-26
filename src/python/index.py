import collections
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
class Solution:
    ## 广度优先遍历，子节点是否在同一层
    def  solve(self,root):
        if root is None:
            return True
        Q = collections.deque([(root,0)])
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
sol = Solution()
root = Tree(1,
            Tree(2, Tree(4)),
            Tree(3, Tree(5), Tree(6)))
print(sol.solve(root))