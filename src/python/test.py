from typing import List


def merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:
    """
    Do not return anything, modify nums1 in-place instead.
    """
    l1, l2, l = m - 1, n - 1, m + n - 1
    while l1 >= 0 and l2 >= 0:
        if nums1[l1] > nums2[l2]:
            nums1[l] = nums1[l1]
            l1 -= 1
        else:
            nums1[l] = nums2[l2]
            l2 -= 1
        l -= 1
    if l2 > 0:
        nums1[0:l] = nums2[0:l2]
    print(nums1)


nums1 = [0]
m = 0
nums2 = [1]
n = 1
merge(nums1, m, nums2, n)
