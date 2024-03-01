import Component from './Component';
import List from './List';

export interface IInputOptions {
	wrapperEL: HTMLElement;
	placeholderText: string;
	buttonText: string;
}
export default class Input extends Component {
	private options: IInputOptions;
	constructor(options: IInputOptions) {
		super();
		this.options = options;
	}
	public render() {
		const { placeholderText, buttonText } = this.options;
		this.options.wrapperEL.innerHTML += Component.inputView(
			placeholderText,
			buttonText
		);
	}
	public bindEvent() {
		const oAddBtn: HTMLElement = document.querySelector('.add-btn')!;
		const oInput: HTMLElement = document.querySelector('.todo-input')!;
		oAddBtn.addEventListener(
			'click',
			this.handleBthClick.bind(this, oInput),
			false
		);
	}
	private handleBthClick(inputDom) {
		const val: string = inputDom.value.trim();
		if (val.length) {
			List.addItem(val);
			inputDom.value = '';
		}
	}
}
