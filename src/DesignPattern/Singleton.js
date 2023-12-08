export default class Singleton {
	static instance = null;
	constructor() {
		if (!Singleton.instance) {
			Singleton.instance = this;
		}
		return Singleton.instance;
	}
}
