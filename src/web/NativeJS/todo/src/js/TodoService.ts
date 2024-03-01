import $ from "jquery"
import {ITodoData} from "./typings";
import {json} from "express";

export function getTodoList(
    target: any,
    methodName: string,
    description: PropertyDescriptor
): void {
    const _origin = description.value
    description.value = function (todoData: ITodoData) {
        $.get('http://localhost:8088/todolist').then((res: string) => {
            if (!res) return
            todoData = JSON.parse(res)
        }).then(() => {
            _origin.call(this, todoData)
        })
    }
}

export function removeTodo(target: any, methodName: string, description: PropertyDescriptor): void {
    const _origin = description.value
    description.value = function (target: HTMLElement, id: number) {
        $.post('http://localhost:8088/remove', {id}).then(res => {
            _origin.call(this, target, id)
        })
    }
}

export function addTodo(target: any, methodName: string, description: PropertyDescriptor): void {
    const _origin = description.value
    description.value = function (todoData: ITodoData) {
        $.post('http://localhost:8088/add', {todoData: JSON.stringify(todoData)}).then(res => {
            if (res.statusCode === 100) {
                alert('项目已存在')
                return
            }
            _origin.call(this,todoData)
        })
    }
}

export function toggleTodo(target: any, methodName: string, description: PropertyDescriptor): void {
    const _origin = description.value
    description.value = function (target: HTMLElement, id: number) {
        $.post('http://localhost:8088/toggle', {id}).then(res => {
            _origin.call(this, target, id)
        })
    }
}