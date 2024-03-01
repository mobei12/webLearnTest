import { ITodoData } from '../../../typings';
import Component from './Component';
export interface IListOptions {
	wrapperEL: HTMLElement;
	todoData: ITodoData[];
}
export default class List extends Component {
	private wrapperEL: HTMLElement;
	//外界传入的唯一引用,挂在原型上
	private static todoData: ITodoData[];
	constructor(options: IListOptions) {
		super();
		this.wrapperEL = options.wrapperEL;
		List.todoData = options.todoData;
	}
	public render() {
		this.wrapperEL.innerHTML += Component.listView(List.todoData);
	}
	public bindEvent() {
		const oTodoList: HTMLElement = document.querySelector('.todo-list')!;
		oTodoList.addEventListener(
			'click',
			this.handleListClick.bind(this),
			false
		);
	}
	public static addItem(val: string) {
		const todoListEl: HTMLElement = document.querySelector('.todo-list')!;
		const _item: ITodoData = {
			id: new Date().getTime(),
			completed: false,
			content: val
		};
		List.todoData.push(_item);
		if (List.todoData.length === 1) todoListEl.innerHTML = '';
		todoListEl.innerHTML += Component.todoView(_item);
	}
	private handleListClick(e: MouseEvent) {
		const tar = e.target as HTMLElement;
		const tagName = tar.tagName.toLocaleLowerCase();
		const oTodoItems: HTMLCollection =
			document.getElementsByClassName('todo-item');
		const _id: string = tar.dataset.id!;
		const id: number = parseInt(_id);
		switch (tagName) {
			case 'input':
				this._handleCheckBoxClick(id, oTodoItems);
				break;
			case 'button':
				this._handleButtonClick(id, oTodoItems);
				break;

			default:
				break;
		}
	}
	private _handleCheckBoxClick(id: number, oTodoItems: HTMLCollection) {
		List.todoData = List.todoData.map((todo: ITodoData, index: number) => {
			if (todo.id === id) {
				todo.completed = !todo.completed;
				const spanEL = oTodoItems[index].querySelector('span')!;
				spanEL.style.textDecoration = todo.completed
					? 'line-through'
					: '';
			}
			return todo;
		});
	}
	private _handleButtonClick(id: number, oTodoItems: HTMLCollection) {
		List.todoData = List.todoData.filter(
			(todo: ITodoData, index: number) => {
				if (todo.id !== id) return todo;
				oTodoItems[index].remove();
			}
		);
	}
}
