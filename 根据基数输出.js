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
	var result = "";
	for (let i = 1; i < 2 * n; i = i + 2) {
		if (i <= n) {
			var spaces = " ".repeat((n - i) / 2);
			var stars = "*".repeat(i);
			result += spaces + stars + "\n";
		} else {
			var spaces = " ".repeat((i - n) / 2);
			var stars = "*".repeat(n * 2 - i);
			result += spaces + stars + "\n";
		}
	}
	console.log(result);
}
renderDiamond(7);
