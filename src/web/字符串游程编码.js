function sr(s) {
  const sTemp = [];
  let lastIndex = Infinity;

  for (let i = 0; i < s.length; i++) {
    if (sTemp.length >= 2) {
      lastIndex = sTemp.length - 2;
    }
    const element = s[i];
    console.log(sTemp, sTemp.length, sTemp[lastIndex]);
    if (sTemp[lastIndex] && sTemp[lastIndex] === element) {
      sTemp[lastIndex + 1] = sTemp[lastIndex + 1] + 1;
    } else {
      sTemp.push(element, 1);
    }
  }

  if (sTemp.length >= s.length) {
    return s;
  } else {
    return sTemp.join("");
  }
}
function sr2(s) {
  let str = "",
    no = 1;
  for (let i = 1; i <= s.length; i++) {
    if (s[i] === s[i - 1]) {
      no++;
    } else {
      str += s[i - 1] + no;
      no = 1;
    }
  }
  return str.length >= s.length ? s : str;
}
const str = "aaabccca";
const str2 = "aabbcccaa";
console.log(sr2(str2));
console.log(sr2("aaabbc")); // a3b2c1
console.log(sr2("abcd"));   // abcd (压缩后不短)
console.log(sr2(""));       // ""