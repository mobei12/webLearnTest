/**
 *	@param {Array} releaseTimes
 *	@param {String} keysPressed
 */
var slowestKey = function (releaseTimes, keysPressed) {
	let max = releaseTimes[0];
	let keyCode = keysPressed[0];
	for (let i = 1; i < keysPressed.length; i++) {
		let time = releaseTimes[i] - releaseTimes[i - 1];
		if (time > max) {
			max = time;
			keyCode = keysPressed[i];
		} else if (time === max && keysPressed[i] > keyCode) {
			keyCode = keysPressed[i];
		}
	}
	return keyCode;
};
console.log(slowestKey([9, 29, 49, 50], "cbcd"));
