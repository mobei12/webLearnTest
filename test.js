var matrix = [[1], [4]],
	target = 2;
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
	if (!matrix || !matrix.length || !matrix[0] || !matrix[0].length) {
		return false;
	}
	var row = 0,
		col = matrix[0].length - 1;
	while (row < matrix.length && col >= 0) {
		if (matrix[row][col] === target) {
			return true;
		} else if (matrix[row][col] > target) {
			col--;
		} else {
			row++;
		}
	}
	return false;
};
console.log(searchMatrix(matrix, target));
