const arrSort = (arr) => {
  if (arr.length < 2) return arr;
  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {//确保把当次的最大值换到最后
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // 某一轮没有发生交换，说明数组已经有序，可以提前结束
  }
  console.log(arr);
};

const arr = [1, 19, 9, 10, 2, 3];
arrSort(arr);
