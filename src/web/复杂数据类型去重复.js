const data = [
  3,
  1,
  [1],
  1,
  [1],
  true,
  /123/,
  function func() {},
  true,
  {},
  "1",
  new String("a"),
  "a",
  NaN,
  undefined,
  NaN,
  undefined,
  {},
  /123/,
  null,
  null,
  function func() {},
  new String("a"),
];
function deepUnique(arr) {
  const seen = new Map();

  return arr.filter((item) => {
    let key;

    if (item instanceof RegExp) {
      key = "regexp:" + item.toString();
    } else if (typeof item === "function") {
      key = "func:" + item.toString();
    } else if (item instanceof String) {
      key = "StringObj:" + item.valueOf();
    } else if (typeof item === "object" && item !== null) {
      key = "obj:" + JSON.stringify(item);
    } else {
      key = typeof item + ":" + String(item);
    }

    if (seen.has(key)) return false;
    seen.set(key, true);
    return true;
  });
}

console.log(deepUnique(data));
