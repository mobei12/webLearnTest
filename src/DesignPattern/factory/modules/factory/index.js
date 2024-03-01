import ModalFactory from './factory.js';
(() => {
	const modalDom = document.querySelector('.modal');
	const btnGroup = document.querySelector('.btn-group');
	const modalFactory = new ModalFactory(modalDom);
	const init = () => {
		bindEvent();
	};

	function bindEvent() {
		btnGroup.addEventListener('click', handleBtnClick, false);
	}
	function handleBtnClick(e) {
		const tar = e.target;
		const tagName = tar.tagName.toLowerCase();
		if (tagName === 'button') {
			const status = tar.dataset.status;
			const modalObj = modalFactory.create('工厂应用', status);
			switch (status) {
				case 'W':
					modalObj.outputInfo('警告提示');
					break;
				case 'E':
					modalObj.outputInfo('错误提示');
					break;
				default:
					break;
			}
		}
	}
	init();
})();
