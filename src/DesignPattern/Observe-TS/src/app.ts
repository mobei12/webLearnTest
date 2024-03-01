import TodoList, { ITodo } from './TodoList';

(doc => {
	const oTodoList: HTMLElement = doc.querySelector('.todo-list')!;
	TodoList.create(oTodoList);
	const oAddBtn: HTMLElement = doc.querySelector('.add-btn')!;
	const oInput: HTMLInputElement = doc.querySelector('input')!;
	const todoList: TodoList = TodoList.create(oTodoList);
	const init = (): void => {
		bindEvent();
	};
	function bindEvent() {
		oAddBtn.addEventListener('click', handleAddBtnClick, false);
		oTodoList.addEventListener('click', handleListClick, false);
	}
	function handleAddBtnClick() {
		const val: string = oInput.value.trim();
		if (!val) return;
		todoList.notify<ITodo>('add', {
			id: new Date().getTime(),
			content: val,
			completed: false
		});
		oInput.value = '';
	}
	function handleListClick(e: MouseEvent) {
		const tar = e.target as HTMLElement;
		const tagname = tar.tagName.toLocaleLowerCase();
		if (tagname === 'button' || tagname === 'input') {
			const id: number = parseInt(tar.dataset.id!);
			switch (tagname) {
				case 'input':
					todoList.notify<number>('toggle', id);
					break;
				case 'button':
					todoList.notify<number>('remove', id);
					break;
				default:
					break;
			}
		}
	}
	init();
})(document);
