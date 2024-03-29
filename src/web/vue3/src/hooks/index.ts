import {Store, useStore} from "vuex";
import {TODO_STATUS, type ITodo} from "../typings";
import {SET_TODO, SET_TODOLIST, REMOVE_TODO, SET_STATUS, SET_DOING} from "../store/actionTypes";
//todo 用类写一下
export interface IUseTodo {
    setTodo: (value: string) => void
    setTodoList: () => void
    removeTodo: (id: number) => void
    setStatus: (id: number) => void
    setDoing: (id: number) => void
}

interface IUseLocalStorage {
    getLocalList: () => ITodo[]
    setLocalList: (todoList: ITodo[]) => void
}

function useTodo(): IUseTodo {
    const store: Store<any> = useStore()
    const {setLocalList, getLocalList} = useLocalStorage()
    const todoList: ITodo[] = getLocalList()

    function setTodo(value: string): void {
        const todo: ITodo = {
            id: new Date().getTime(),
            content: value,
            status: TODO_STATUS.WILLDO
        }
        store.dispatch(SET_TODO, todo)
        setLocalList(store.state.list)
    }

    function setTodoList() {
        store.dispatch(SET_TODOLIST, todoList)
    }

    function removeTodo(id: number): void {
        store.dispatch(REMOVE_TODO, id)
        setLocalList(store.state.list)
    }

    function setStatus(id: number): void {
        store.dispatch(SET_STATUS, id)
    }

    function setDoing(id: number): void {
        store.dispatch(SET_DOING, id)
    }

    return {
        setTodo,
        setTodoList,
        removeTodo,
        setStatus,
        setDoing
    }
}

function useLocalStorage(): IUseLocalStorage {
    function getLocalList(): ITodo[] {
        return JSON.parse(localStorage.getItem('todoList') || '[]')
    }

    function setLocalList(todoList: ITodo[]): void {
        localStorage.setItem('todoList', JSON.stringify(todoList))
    }

    return {
        getLocalList,
        setLocalList
    }
}

export {useTodo,}

