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
consoleStar(11);
