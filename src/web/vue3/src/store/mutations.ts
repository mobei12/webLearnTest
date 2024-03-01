import {REMOVE_TODO, SET_DOING, SET_STATUS, SET_TODO, SET_TODOLIST} from "./actionTypes";
import type {IState, ITodo} from "../typings";
import {TODO_STATUS} from "../typings";

export default {
    [SET_TODO](state: IState, todo: ITodo): void {
        state.list.unshift(todo)
    },
    [SET_TODOLIST](state: IState, todoList: ITodo[]): void {
        state.list = todoList
    },
    [REMOVE_TODO](state: IState, id: number): void {
        state.list = state.list.filter((item: ITodo) => item.id !== id)
    },
    [SET_DOING](state: IState, id: number): void {
        state.list = state.list.map((item: ITodo): ITodo => {
            if (item.id === id) {
                if (item.status === TODO_STATUS.WILLDO) {
                    item.status = TODO_STATUS.DOING
                } else if (item.status === TODO_STATUS.DOING) {
                    item.status = TODO_STATUS.FINISHED
                }
            }
            return item
        })
    },
    [SET_STATUS](state: IState, id: number): void {
        state.list = state.list.map((item: ITodo): ITodo => {
            if (item.id === id) {
                item.status = TODO_STATUS.FINISHED
            }
            return item
        })
    }
}
