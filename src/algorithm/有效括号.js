/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stMap = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
  ]);
  const sArr = s.split("");
  const stakStr = [sArr[0]];
  for (let i = 1; i < sArr.length; i++) {
    const element = sArr[i];
    if (stMap.get(stakStr.slice(-1)[0]) === element) {
      stakStr.splice(-1);
    } else {
      stakStr.push(element);
    }
  }
  return stakStr.length === 0;
};
const IsValidParentheses = (str) => {
  if (str.length % 2 !== 0) return false;
  const deqArr = [];
  const leftP = "]})";
  for (let i = 0; i < str.length; i++) {
    const element = str[i];
    if (leftP.includes(element) && deqArr === 0) {
      return false;
    } else if (
      (element === "]" && deqArr[deqArr.length - 1] === "[") ||
      (element === ")" && deqArr[deqArr.length - 1] === "(") ||
      (element === "}" && deqArr[deqArr.length - 1] === "{")
    ) {
      deqArr.pop();
    } else {
      deqArr.push(element);
    }
  }
  return deqArr.length === 0;
};
const str = "((}";
console.log(IsValidParentheses(str));
