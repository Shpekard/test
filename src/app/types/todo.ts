export interface ToDoItem {
    title: string,
    description: string,
    isExecuted: boolean
}

export interface ToDoDb extends ToDoItem {
    id: number,
    date: string
}