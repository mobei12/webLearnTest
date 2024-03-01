import { ITodo } from '.';

export default class TodoDom {
	private static instance: TodoDom;
	private oTodoList: HTMLElement;
	constructor(oTodoList: HTMLElement) {
		this.oTodoList = oTodoList;
	}
	public static create(oTodoList: HTMLElement) {
		if (!TodoDom.instance) {
			TodoDom.instance = new TodoDom(oTodoList);
		}
		return TodoDom.instance;
	}
	public addItem(todo: ITodo): Promise<void> {
		return new Promise((resolve, reject) => {
			const oItem: HTMLElement = document.createElement('div');
			oItem.className = 'todo-item';
			oItem.innerHTML = this.todoView(todo);
			this.oTodoList.appendChild(oItem);
			resolve();
		});
	}
	public removeItem(id: Number): Promise<void> {
		return new Promise((resolve, reject) => {
			const oItems: HTMLCollection =
				document.getElementsByClassName('todo-item');
			Array.from(oItems).forEach(oItem => {
				const buttonEL: HTMLElement = oItem.querySelector('button')!;
				const _id: number = parseInt(buttonEL.dataset.id!);
				if (_id === id) {
					oItem.remove();
					resolve;
				}
			});
		});
	}
	public toggleItem(id: Number): Promise<void> {
		return new Promise((resolve, reject) => {
			const oItems: HTMLCollection =
				document.getElementsByClassName('todo-item');
			Array.from(oItems).forEach(oItem => {
				const oCheckbox: HTMLInputElement =
					oItem.querySelector('input')!;
				const _id: number = parseInt(oCheckbox.dataset.id!);
				if (_id === id) {
					const oContent: HTMLElement = oItem.querySelector('span')!;
					oContent.style.textDecoration = oCheckbox.checked
						? 'line-through'
						: 'none';
					resolve;
				}
			});
		});
	}
	private todoView({ id, content, completed }: ITodo): string {
		return `
            <input type="checkbox" ${
				completed ? 'checked' : ''
			} data-id="${id}" />
            <span style ="text-decoration:${
				completed ? 'line-through' : 'none'
			}">${content}<span>
            <button data-id="${id}">删除</button>
        `;
	}
}
