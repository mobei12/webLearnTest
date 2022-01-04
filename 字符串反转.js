var str = "abcdefg";
var reverseStr = function (str) {
	if (str.length === 1) return str;
	return (
		str.substring(str.length - 1) +
		reverseStr(str.substring(0, str.length - 1))
	);
};
console.log(reverseStr(str));
