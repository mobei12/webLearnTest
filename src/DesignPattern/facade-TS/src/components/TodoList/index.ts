import { ITodoData } from '../../typings';
import Input, { IInputOptions } from './Subs/Input';
import List, { IListOptions } from './Subs/List';
export default class TodoList {
	private el: HTMLElement;
	private todoData: ITodoData[];
	private Input: Input;
	private List: List;
	private todoWrapper: HTMLElement;

	constructor(el: HTMLElement, todoData: ITodoData[]) {
		this.el = el;
		this.todoData = todoData;
		this.todoWrapper = document.createElement('div');
	}
	public init() {
		this.createComponents();
		this.render();
		this.bindEvent();
	}
	private createComponents() {
		this.Input = new Input(<IInputOptions>{
			wrapperEL: this.todoWrapper,
			placeholderText: '请输入',
			buttonText: '增加'
		});
		this.List = new List(<IListOptions>{
			wrapperEL: this.todoWrapper,
			todoData: this.todoData,
		});
	}
	private render() {
		this.Input.render();
		this.List.render();
		this.el.appendChild(this.todoWrapper);
	}
	private bindEvent() {
		this.Input.bindEvent()
		this.List.bindEvent()
		console.log('bindEvent');
	}
}
