// 1个数从1开始，每一步只能乘3或者加5，目标值1024，求最小步数
function getMinStep(aim) {
  const queue = [];
  const visited = new Set();

  queue.push({ value: 1, step: 0 });
  visited.add(1);

  while (queue.length > 0) {
    console.log(queue)
    const { value, step } = queue.shift();

    if (value === aim) return step;

    // 乘3
    const mul = value * 3;
    if (mul <= aim && !visited.has(mul)) {
      queue.push({ value: mul, step: step + 1 });
      visited.add(mul);
    }

    // 加5
    const add = value + 5;
    if (add <= aim && !visited.has(add)) {
      queue.push({ value: add, step: step + 1 });
      visited.add(add);
    }
  }

  return -1; // 无法到达目标
}

console.log(getMinStep(1024));