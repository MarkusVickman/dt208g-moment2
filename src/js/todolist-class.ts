/*TypeScript-kod för att hantera todo-lista på webbplatsen där användaren kan spara in "att göra text", prioritet och om uppgiften är slutförd. Detta lagras till localstorage. 
Användaren kan även tabort tidigare inlägg*/

import { Todo } from "./interfaces";

//Egen typ för att säkerställa att prioritet är rätt siffra
//type PriorityRange = 1|2|3;



//Klass för att skapa objekt till todo-listan som följer interface-mallen Todo
export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: number;

    private static todos: Todo[] = [];

    constructor(task: string, completed: boolean, priority: /*PriorityRange*/number) {

        this.task = task;
        this.completed = completed;
        this.priority = priority;

        //  this.todos.push(newTask);
        /*
        this.saveToLocalStorage();
        this.loadFromLocalStorage();*/
        //console.log(this.todos);

    }

    public static addTodo(addNew: Todo/*task: string, completed: boolean, priority: number*/): boolean {
        //console.log(addNew.task.length + " " + addNew.priority);
        if (addNew.task.length > 0 && (addNew.priority === 1 || addNew.priority === 2 || addNew.priority === 3)) {
            this.todos.push(addNew);
            this.todos.sort((n1, n2) => {
                if (n1.priority > n2.priority) {
                    return 1;
                }

                if (n1.priority < n2.priority) {
                    return -1;
                }

                return 0;
            });
            //this.todos = sortedArray;
            //console.log(this.todos);

            return true;
        }
        else {
            return false;
        }
    }

    public static resetTodosArray(): void {
        let tempTodos: Todo[] = [];
        this.todos = tempTodos;
    }

    public static markTodoCompleted(todoIndex: number): void {
        const tempObject = this.todos[todoIndex];
        const newTodoList = new TodoList(tempObject.task, true, tempObject.priority);

        this.todos.splice(todoIndex, 1, newTodoList);
    }

    public static getTodos(): Todo[] {

        return this.todos;
    }

    public static saveToLocalStorage(): void {
        localStorage.setItem("Allt sparas i denna key", JSON.stringify(this.todos));
    }

    public static loadFromLocalStorage(): void {
        if (localStorage.length >= 1) {
            let tempTodos: Todo[] = [];
            for (let i = 0; i < localStorage.length; i++) {
                let tempArray: any = JSON.parse(localStorage.getItem("Allt sparas i denna key")!);
                tempArray.forEach(element => {
                    tempTodos.push(element);
                })
            }
            this.todos = tempTodos;
        }
        // console.log(this.todos);
    }

}


