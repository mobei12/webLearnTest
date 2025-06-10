// 生成随机字符的函数
function generateRandomChar() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
	return chars[Math.floor(Math.random() * chars.length)];
}

// 生成长度为4的随机字符串
function generateRandomString() {
	let result = '';
	for (let i = 0; i < 4; i++) {
		result += generateRandomChar();
	}
	return result;
}

// 1. 生成二维数组的函数
function generate2DArray(length) {
	const result = [];

	for (let i = 0; i < length; i++) {
		// 每个内层数组的长度：1到length之间的随机数
		const innerLength = Math.floor(Math.random() * length) + 1;
		const innerArray = [];

		for (let j = 0; j < innerLength; j++) {
			innerArray.push(generateRandomString());
		}

		result.push(innerArray);
	}

	return result;
}

// 2. 合并所有有重合的数组的函数
function mergeArraysIfOverlap(array2D) {
	if (array2D.length < 2) {
		return [...array2D];
	}

	// 创建数组的副本
	let result = array2D.map(arr => [...arr]);
	let merged = true;

	// 持续合并直到没有更多可合并的数组
	while (merged) {
		merged = false;

		// 检查每一对数组是否有重合
		for (let i = 0; i < result.length - 1; i++) {
			for (let j = i + 1; j < result.length; j++) {
				// 检查数组i和数组j是否有重合项
				let hasOverlap = false;
				for (let item of result[i]) {
					if (result[j].includes(item)) {
						hasOverlap = true;
						break;
					}
				}

				// 如果有重合，合并这两个数组
				if (hasOverlap) {
					// 合并并去重
					const mergedArray = [...new Set([...result[i], ...result[j]])];

					// 替换第i个数组为合并后的数组
					result[i] = mergedArray;

					// 删除第j个数组
					result.splice(j, 1);

					merged = true;
					break; // 重新开始检查
				}
			}
			if (merged) break; // 如果发生了合并，重新开始外层循环
		}
	}

	return result;
}

function makeArraySample(array) {
	if (!Array.isArray(array)) return []
	if (array.length < 2) return array
	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			const tempSet = new Set([...(array[i].slice(1)), ...(array[j].slice(1))])
			if (tempSet.size < (array[i].length + array[j].length - 2)) {
				array[j] = [array[i][0], ...tempSet]
				array.splice(i, 1)
			}
		}
	}
	return array
}


console.log('\n=== 合并数组示例 ===');
// 创建一个测试用的二维数组，多个数组之间有重合项
const testArray2 = [['John', 'johnsmith@mail.com', 'john00@mail.com'], ['John', 'johnnybravo@mail.com'], ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'], ['Mary', 'mary@mail.com']];
const resultArray = generate2DArray(4);
//console.log('原始二维数组：', testArray2);
makeArraySample(testArray2)
console.log('合并后的二维数组1：');
