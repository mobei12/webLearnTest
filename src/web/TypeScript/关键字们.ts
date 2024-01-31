{interface Todo {
	name: string;
	age: number;
	description?: string;
}
/*Partial 关键字，用于将对象中的部分属性设为可选*/
const updateTodo = (todo: Todo, inputData: Partial<Todo>) => {
	return {
		...todo,
		inputData
	};
};
/*Required 关键字，用于将对象中的部分属性设为必选*/
const updateTodo2 = (todo: Todo, inputData: Required<Todo>) => {
	return {
		...todo,
		inputData
	};
};
const initData: Todo = {
	name: '123',
	age: 123
};
updateTodo(initData, {});
updateTodo2(initData, {
	name: '123',
	age: 123,
	description: '123'
});

type a = Record<number, string>;}