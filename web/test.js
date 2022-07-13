const haveCharacter = strVal => {
	//匹配除了.的特殊字符
	const testStr = RegExp(/[^\w^\s^\u4e00-\u9fa5^\u002e]/);
	return testStr.test(strVal);
};
console.log(haveCharacter("124."))