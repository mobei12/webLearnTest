冒泡排序（Bubble Sort）是最易懂的排序算法，但是效率较低，生产环境中很少使用。

它的基本思想是：

依次比较相邻的两个数，如果不符合排序规则，则调换两个数的位置。这样一遍比较下来，能够保证最大（或最小）的数排在最后一位。

再对最后一位以外的数组，重复前面的过程，直至全部排序完成。

由于每进行一次这个过程，在该次比较的最后一个位置上，正确的数会自己冒出来，就好像“冒泡”一样，这种算法因此得名。

以对数组[3, 2, 4, 5, 1]进行从小到大排序为例，步骤如下：

第一位的“3”与第二位的“2”进行比较，3 大于 2，互换位置，数组变成[2, 3, 4, 5, 1]。

第二位的“3”与第三位的“4”进行比较，3 小于 4，数组不变。

第三位的“4”与第四位的“5”进行比较，4 小于 5，数组不变。

第四位的“5”与第五位的“1”进行比较，5 大于 1，互换位置，数组变成[2, 3, 4, 1, 5]。

第一轮排序完成，可以看到最后一位的 5，已经是正确的数了。然后，再对剩下的数[2, 3, 4, 1]重复这个过程，每一轮都会在本轮最后一位上出现正确的数。直至剩下最后一个位置，所有排序结束。