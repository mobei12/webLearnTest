const arr = [1, 1, 2, 2, 2, 5, 10, 11, 11];
const k = 2;
const map = new Map();
arr.forEach((item) => {
  if (map.has(item)) {
    map.set(item, map.get(item) + 1);
  } else {
    map.set(item, 1);
  }
});
const res = new Map();
const temp = [];
for (const [key, value] of map) {
  console.log(key, value);
}
