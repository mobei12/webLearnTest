import {ITodoData} from "./typings";
import TodoDom from "./TodoDom";
import {getTodoList, removeTodo, toggleTodo,addTodo} from "./TodoService";

export default class TodoEvent extends TodoDom {
    private toDoData: ITodoData[];

    constructor(todoData: ITodoData[], todoWrapper: HTMLElement) {
        super(todoWrapper);
        this.init(this.toDoData)
    }

    @getTodoList
    private init(todoData: ITodoData[]) {
        this.toDoData = todoData;
        this.initList(this.toDoData)
    }

    @addTodo
    public addTodo(todoData: ITodoData): undefined | number {
        const _todo: ITodoData[] = this.toDoData.filter(item => item.id === todoData.id || item.content === todoData.content);
        if (_todo.length <= 0) {
            this.toDoData.push(todoData);
            this.addItem(todoData)
            return
        }
        return 1001
    }

    @removeTodo
    public removeTodo(target: HTMLElement, id: number): void {
        this.toDoData = this.toDoData.filter(item => item.id !== id);
        this.removeItem(target)
    }

    public updateTodo(todoData: ITodoData): void {
        this.toDoData = this.toDoData.map(item => {
            if (item.id === todoData.id) {
                return todoData;
            }
            return item;
        })
    }

    @toggleTodo
    public toggleTodo(target: HTMLElement, id: number): void {
        this.toDoData = this.toDoData.map((item: ITodoData) => {
            if (item.id === id) {
                item.completed = !item.completed;
                this.changeCompleted(target, item.completed)
            }
            return item;
        })
    }
}