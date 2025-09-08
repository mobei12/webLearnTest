//实现一个deepGet函数， deepGet({a:{b:{c:1}}},’a.b.c’) 返回 1，deepGet({a:1},’a.b.c’,'default') 返回 default ,如果是数组怎么支持 a[0].b
function deepGet(obj, path, defaultValue = "defaultValue") {
  if (!obj || !path) return defaultValue;

  // 把 a[0].b 转换为 a.0.b → ["a","0","b"]
  const keys = path.replace(/\[(\d+)\]/g, ".$1").split(".");

  let tempObj = obj;
  for (const key of keys) {
    if (tempObj == null || !(key in tempObj)) {
      return defaultValue;
    }
    tempObj = tempObj[key];
  }

  return tempObj;
}
console.log(deepGet({ a: [{ b: { c: 1 } }] }, "a[0].b.c"));
