import {ITodoData} from "./js/typings";
import TodoEvent from "./js/TodoEvent";

;(function (doc) {
    const oInput: HTMLInputElement = doc.querySelector('input');
    const oAddBtn: HTMLButtonElement = doc.querySelector('button');
    const oTodoList: HTMLElement = doc.querySelector('.todo-list');
    const todoData: ITodoData[] = []
    // 创建TodoEvent实例
    const todoEvent = new TodoEvent(todoData, oTodoList);
    const init = (): void => {
        bindEvent()
    }

    function bindEvent() {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oTodoList.addEventListener('click', handleTodoListClick, false);
    }

    function handleAddBtnClick(e: Event): void {
        const value: string = oInput.value.trim();
        if (value) {
            const res = todoEvent.addTodo(<ITodoData>{
                id: Date.now(),
                content: value,
                completed: false
            });
            if (res === 1001) {
                alert('添加失败,内容已存在')
                return
            }
            oInput.value = '';
        } else {
            alert('请输入内容')
        }
    }

    function handleTodoListClick(e: MouseEvent): void {
        const target: HTMLElement = e.target as HTMLElement;
        const tagName: string = target.tagName.toLowerCase();
        if (tagName === 'input' || tagName === 'button') {
            const id: number = Number(target.dataset.id);
            switch (tagName) {
                case 'input':
                    todoEvent.toggleTodo(target, id);
                    break;
                case 'button':
                    todoEvent.removeTodo(target, id);
                    break;
                default:
                    break;

            }
        }
    }

    init();
})(document)