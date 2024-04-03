//Interface som typmall för objekt till todo-listan
export interface Todo {
    task: string;
    completed: boolean;
    priority: /*PriorityRange*/number;
}