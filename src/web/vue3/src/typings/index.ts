interface ITodo {
    id: number
    content: string
    status: TODO_STATUS
}

interface IState {
    list: ITodo[]
}

export enum TODO_STATUS {
    FINISHED = 'finished',
    DOING = 'doing',
    WILLDO = 'willdo'
}

export type {ITodo, IState}
