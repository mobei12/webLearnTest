function renderDiamond(n) {
	var result = "";
	for (var i = 0; i < n; i = i + 2) {
		var spaces = " ".repeat((n - i) / 2);
		var stars = "*".repeat(1 * i + 1);
		result += spaces + stars + "\n";
	}
	for (var i = n - 2; i >= 0; i = i - 2) {
		var spaces = " ".repeat((n - i) / 2);
		var stars = "*".repeat(i);
		result += spaces + stars + "\n";
	}
	console.log(result);
}
renderDiamond(7);
let a = "123";
console.log(a.repeat(5));
