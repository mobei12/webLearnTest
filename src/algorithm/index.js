/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Object();
  for (let i = 0; i < strs.length; i++) {
    const element = strs[i];
    const temArr = Array(26).fill(0);
    for (let j = 0; j < element.length; j++) {
      const elWord = element[j];
      const key = elWord.charCodeAt() - 97;
      temArr[key] += 1;
    }
    const mapK = temArr.join("");
    map[mapK] ? map[mapK].push(element) : (map[mapK] = [element]);
  }
  return Object.values(map);
};
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"];
console.log(groupAnagrams(strs));
