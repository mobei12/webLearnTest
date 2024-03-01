import {ITodoData} from "./typings";

export default class TodoTemplate {
    //创建todo的子模版
    protected todoView({id, content, completed}: ITodoData): string {
        console.log(id,content,completed)
        return `
        <input type="checkbox" id="${id}" ${completed ? 'checked' : ''} data-id="${id}" />     
        <span style="text-decoration: ${completed ? 'line-through' : 'none'}">${content}</span>  
        <button class="btn btn-danger" data-id="${id}">删除</button>
`
    }
}