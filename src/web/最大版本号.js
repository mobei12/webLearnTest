//1.1、最大版本号
let versions = ['1.0.20.3', '2.0.3', '3.6.27.1', '3.14.5'];
var maxVersion = function (versions) {
	let rst = versions[0],
		val = versions[0].replaceAll('.', '');
	for (let i = 1; i < versions.length; i++) {
		let element = versions[i].replaceAll('.', '');
		if (val.length > element.length) {
			element += '0'.repeat(val.length - element.length);
			if (val * 1 < element * 1) {
				rst = versions[i];
				val = versions[i].replaceAll('.', '');
			}
		} else if (val.length === element.length) {
			if (val * 1 < element * 1) {
				rst = versions[i];
				val = versions[i].replaceAll('.', '');
			}
		} else {
			val += '0'.repeat(element.length - val.length);
			if (val * 1 < element * 1) {
				rst = versions[i];
				val = versions[i].replaceAll('.', '');
			}
		}
	}
};
console.log(maxVersion(versions));
