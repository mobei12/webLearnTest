import {ITodoData} from "./typings";
import TodoTemplate from "./TodoTemplate";
import {creatItem, findParent} from "./utils";

export default class TodoDom extends TodoTemplate {
    private todoWrapper: HTMLElement;

    constructor(toDoWrapper: HTMLElement) {
        super();
        this.todoWrapper = toDoWrapper;
    }

    protected initList(todoData: ITodoData[]): void {
        if (todoData&&todoData.length > 0) {
            const oFrag: DocumentFragment = document.createDocumentFragment();
            todoData.forEach((item: ITodoData) => {
                oFrag.appendChild(creatItem('div','todo-item',this.todoView(item)));
            })
            this.todoWrapper.appendChild(oFrag)
        } else {

        }
    }

    /**
     * @description 创建todo的子模版
     * @param {ITodoData} todoData
     */
    protected addItem(todoData: ITodoData): void {
        this.todoWrapper.appendChild(creatItem('div','todo-item',this.todoView(todoData)));
    }

    protected removeItem(target: HTMLElement) {
        const oParent: HTMLElement = findParent(target, 'todo-item');
        oParent.remove();
    }

    protected changeCompleted(target: HTMLElement, completed: boolean) {
        const oParent: HTMLElement = findParent(target, 'todo-item');
        const oCheckbox: HTMLInputElement = oParent.querySelector('input');
        const oSpan: HTMLElement = oParent.querySelector('span');
        const oBtn: HTMLElement = oParent.querySelector('button');
        oCheckbox.checked = completed;
        oSpan.style.textDecoration = completed ? 'line-through' : 'none';
        oBtn.className = oCheckbox.checked ? 'btn btn-danger' : 'btn btn-primary';
    }
}