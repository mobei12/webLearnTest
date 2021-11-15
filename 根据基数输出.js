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
	let a = "",
		b = "*";
	for (let i = 0; i < n; i++) {
		if (i === 0) {
			a = b;
		} else {
			if (i < (n + 1) / 2) {
				a = a + b + b;
			} else {
				a = a.substr(0, a.length - 2);
			}
		}
		console.log(a);
	}
}
renderDiamond(7);
