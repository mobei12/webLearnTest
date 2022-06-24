/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
	const stMap = new Map([
		['(', ')'],
		['{', '}'],
		['[', ']']
	]);
	const sArr = s.split('');
	const stakStr = [sArr[0]];
	for (let i = 1; i < sArr.length; i++) {
		const element = sArr[i];
		if (stMap.get(stakStr.slice(-1)[0]) === element) {
			stakStr.splice(-1);
		} else {
			stakStr.push(element);
		}
	}
	return stakStr.length === 0;
};
const str = '{[]}';
console.log(isValid(str));
