import TodoDom from './TodoDom';
import TodoEvent from './TodoEvent';

export interface ITodo {
	id: number;
	content: string;
	completed: boolean;
}
/* 枚举事件类型 */
enum EVENT_TYPE {
	ADD = 'add',
	REMOVE = 'remove',
	TOGGLE = 'toggle'
}

export default class TodoList {
	//todoList实例，采用单例
	private static instance: TodoList;
	//缓存的list容器
	private oTodoList: HTMLElement;
	private todoEvent: TodoEvent;
	private todoDom: TodoDom;
	/* 收集事件 */
	private addHandlers: any[] = [];
	private removeHandlers: any[] = [];
	private toggleHandlers: any[] = [];
	constructor(oTodoList: HTMLElement) {
		this.oTodoList = oTodoList;
		this.initTodo();
	}
	/**
	 *@param {HTMLElement} oTodoList 传入容器
	 **/
	public static create(oTodoList: HTMLElement) {
		/* 单例模式 */
		if (!TodoList.instance) {
			TodoList.instance = new TodoList(oTodoList);
		}
		return TodoList.instance;
	}
	/* 初始化事件处理和dom操作类 */
	private initTodo() {
		this.todoEvent = TodoEvent.create();
		this.todoDom = TodoDom.create(this.oTodoList);
		for (const v in EVENT_TYPE) {
			this.initHandlers(EVENT_TYPE[v]);
		}
		console.log(this.addHandlers);
		console.log(this.removeHandlers);
		console.log(this.toggleHandlers);
	}
	/**
	 *初始化事件操作的函数，并缓存
	 *@param {EVENT_TYPE} type 事件类型
	 **/
	private initHandlers(type: EVENT_TYPE) {
		switch (type) {
			case EVENT_TYPE.ADD:
				/* 存储新增的方法，并改变操作的this绑定 */
				this.addHandlers.push(
					this.todoEvent.addTodo.bind(this.todoEvent)
				);
				this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom));
				break;
			case EVENT_TYPE.REMOVE:
				this.removeHandlers.push(
					this.todoEvent.removeTodo.bind(this.todoEvent)
				);
				this.removeHandlers.push(
					this.todoDom.removeItem.bind(this.todoDom)
				);
				break;
			case EVENT_TYPE.TOGGLE:
				this.toggleHandlers.push(
					this.todoEvent.toggleTodo.bind(this.todoEvent)
				);
				this.toggleHandlers.push(
					this.todoDom.toggleItem.bind(this.todoDom)
				);
				break;
			default:
				break;
		}
	}
	/**
	 *dom 操作时，调用
	 *@param {EVENT_TYPE} type 操作类型
	 *@param {t} type 操作参数
	 **/
	public notify<T>(type: string, param: T) {
		let i: number = 0;
		let handlers: any[] = [];
		let res: any;
		switch (type) {
			case EVENT_TYPE.ADD:
				handlers = this.addHandlers;
				break;
			case EVENT_TYPE.REMOVE:
				handlers = this.removeHandlers;
				break;
			case EVENT_TYPE.TOGGLE:
				handlers = this.toggleHandlers;
				break;
			default:
				break;
		}
		/* 先执行第一个，利用返回的promise链式调用 */
		res = handlers[i](param);
		while (i < handlers.length - 1) {
			i++;
			res = res.then(param => {
				return handlers[i](param);
			});
		}
	}
}
