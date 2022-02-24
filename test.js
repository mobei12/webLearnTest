/**
 * @param {number[]} numbers
 * @return {number}
 */
 var findShortestSubArray = function(nums) {
    const mp = {};

    for (const [i, num] of nums.entries()) {
        if (num in mp) {
            mp[num][0]++;
            mp[num][2] = i;
        } else {
            mp[num] = [1, i, i];
        }
    }
    console.log(Object.values(mp))
    let maxNum = 0, minLen = 0;
    for (const [count, left, right] of Object.values(mp)) {
        if (maxNum < count) {
            maxNum = count;
            minLen = right - left + 1;
        } else if (maxNum === count) {
            if (minLen > (right - left + 1)) {
                minLen = right - left + 1;
            }
        }
    }
    return minLen;
};

console.log(findShortestSubArray([1,2,2,3,1]))