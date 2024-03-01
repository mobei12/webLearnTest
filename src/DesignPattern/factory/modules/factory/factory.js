/**
 *公共方法、属性
 *Modal 父类
 *
 * 对每种状态内部加工，各自扩展功能
 *
 * Success Waring Error Modal
 */
import { ModalTypes } from './typing.js';
/* 弹出框父类 */
class Modal {
	constructor(status) {
		this.status = status;
	}
	get className() {
		let classStr = 'modal';
		switch (this.status) {
			case ModalTypes.SUCCESS:
				classStr = `${classStr} success`;
				break;
			case ModalTypes.WARING:
				classStr = `${classStr} waring`;
				break;
			case ModalTypes.ERROR:
				classStr = `${classStr} error`;
				break;
			default:
				break;
		}
		return classStr;
	}
	static checkStatusIsExist(types, status) {
		for (const k in types) {
			if (types[k] === status) return true;
		}
		return false;
	}
	static outputInfo(info) {
		console.log(info);
	}
	closeDom(dom, time = 1000) {
		setTimeout(() => {
			dom.style.display = 'none';
		}, time);
	}
}
/* 弹出框成功类 */
class SuccessModal extends Modal {
	constructor(title) {
		super(ModalTypes.SUCCESS);
		this.title = `成功：${title}`;
	}
}
/* 弹出框警告类 */
class WaringModal extends Modal {
	constructor(title) {
		super(ModalTypes.WARING);
		this.title = `警告:${title}`;
	}
	outputInfo(info) {
		Modal.outputInfo(`警告提示：${info}`);
	}
}
/* 弹出框错误类 */
class ErrorModal extends Modal {
	constructor(title) {
		super(ModalTypes.ERROR);
		this.title = `失败：${title}`;
	}
	outputInfo(err) {
		Modal.outputInfo(`失败：${err}`);
	}
}
export default class ModalFactory {
	constructor(dom) {
		this.dom = dom;
	}
	create(title, status) {
		const statusIsExist = Modal.checkStatusIsExist(ModalTypes, status);
		if (!statusIsExist) {
			throw new Error('Modal type is incorrect.');
		}
		const dom = this.dom;
		let modal = null;
		switch (status) {
			case ModalTypes.SUCCESS:
				modal = new SuccessModal(title);
				break;
			case ModalTypes.WARING:
				modal = new WaringModal(title);
				break;
			case ModalTypes.ERROR:
				modal = new ErrorModal(title);
				break;
			default:
				break;
		}
		dom.getElementsByTagName('header')[0].innerText = modal.title;
		const closeDom = dom.getElementsByClassName('close')[0];
		closeDom.addEventListener(
			'click',
			function (e) {
				modal.closeDom(dom);
			},
			false
		);
		dom.className = modal.className;
		return {
			outputInfo: modal.outputInfo
		};
	}
}
