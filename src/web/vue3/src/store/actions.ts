import {SET_TODO, SET_TODOLIST, REMOVE_TODO, SET_STATUS, SET_DOING} from "./actionTypes";
import type {IState, ITodo} from "../typings";
import type {Commit} from "vuex";

interface ICtx {
    commit: Commit,
    state?: IState
}

export default {
    [SET_TODO]({commit}: ICtx, todo: ITodo): void {
        commit(SET_TODO, todo)
    },
    [SET_TODOLIST]({commit}: ICtx, todoList: ITodo[]): void {
        commit(SET_TODOLIST, todoList)
    },
    [REMOVE_TODO]({commit}: ICtx, id:number): void {
        commit(REMOVE_TODO, id)
    },
    [SET_STATUS]({commit}: ICtx, id:number): void {
        commit(SET_STATUS, id)
    },
    [SET_DOING]({commit}: ICtx, id:number): void {
        commit(SET_DOING, id)
    },
}
