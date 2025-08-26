//输入一个 query 字符串，?ab=2&c=3&c=33，输出：{ab:2,c:3},如果参数有重复，value 为数组
function generatedObjByQueryStr(str) {
  str = str.replace(/^\?/, ""); // 只去掉开头的问号
  if (!str) return {};
  const map = {};
  for (const pair of str.split("&")) {
    if (!pair) continue;
    const [key, val] = pair.split("=");
    if (map.hasOwnProperty(key)) {
      if (Array.isArray(map[key])) {
        map[key].push(val);
      } else {
        map[key] = [map[key], val];
      }
    } else {
      map[key] = val;
    }
  }
  return map;
}
const str = "?ab=2&c=3&c=33";
console.log(generatedObjByQueryStr(str))
