/* 3.输出一个菱形
编写一个方法，根据入参的一个奇数n，在控制台打印出一个由‘※’填充而成的菱形，横向最长的填充为n个‘※’；
例如输入5，输出的结果
  *
 ***
*****
 ***
  *

例如输入7，输出和的结果
   *
  ***
 *****
*******
 *****
  ***
   * */
function renderDiamond(n) {
	var result = '';
	for (let i = 1; i < 2 * n; i = i + 2) {
		if (i <= n) {
			var spaces = ' '.repeat((n - i) / 2);
			var stars = '*'.repeat(i);
			result += spaces + stars + '\n';
		} else {
			var spaces = ' '.repeat((i - n) / 2);
			var stars = '*'.repeat(n * 2 - i);
			result += spaces + stars + '\n';
		}
	}
	console.log(result);
}
const consoleStar = rowsNumber => {
	let half = Math.ceil(rowsNumber / 2);
	for (let i = 1; i < rowsNumber + 1; i++) {
		if (i <= half) {
			console.log(' '.repeat(half - i) + '*'.repeat(2 * i - 1));
		} else {
			console.log(
				' '.repeat(i - half) + '*'.repeat(rowsNumber - (i - half) * 2)
			);
		}
	}
};

const getNumberPrint = n => {
	let stars = '*',
		space = '-';
	for (let index = 1; index <= n; index++) {
		if (index * 2 - 1 < n) {
			console.log(space.repeat((n - stars.length) / 2) + stars);
		} else {
			console.log(`___${stars}`);
		}
	}
};
getNumberPrint(5);
