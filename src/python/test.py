from collections import deque


q = deque([1,2,3,4])
ql = q.rotate(2) # [1], q[2,3]
print(q.maxlen)