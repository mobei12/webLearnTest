import { ITodo } from '.';

export default class TodoEvent {
	private static instance: TodoEvent;
	private todoData: ITodo[] = [];
	constructor() {}
	public static create() {
		if (!TodoEvent.instance) {
			TodoEvent.instance = new TodoEvent();
		}
		return TodoEvent.instance;
	}
	/**
	 * 新增操作方法，并返回promise，方便后续链式调用
	 *@param {ITodo} todo 新增的数据
	 **/
	public addTodo(todo: ITodo): Promise<ITodo> {
		return new Promise((resolve, reject) => {
			const _todo: ITodo | null | undefined =
				this.todoData.find(t => t.content === todo.content) || null;
			if (_todo) {
				alert('该项已经存在');
				return;
			}
			this.todoData.push(todo);
			resolve(todo);
		});
	}
	public removeTodo(id: number): Promise<number> {
		return new Promise((resolve, reject) => {
			this.todoData = this.todoData.filter(t => t.id !== id);
			resolve(id);
		});
	}
	public toggleTodo(id: number): Promise<number> {
		return new Promise((resolve, reject) => {
			this.todoData = this.todoData.map(t => {
				if (t.id === id) {
					t.completed = !t.completed;
					resolve(id);
				}
				return t;
			});
		});
	}
}
