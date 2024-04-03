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
        console.log(addNew.task.length + " " + addNew.priority);
        if (addNew.task.length > 0 && (addNew.priority === 1 || addNew.priority === 2 || addNew.priority === 3)) {
            this.todos.push(addNew);
            let sortedArray: Todo[] = this.todos.sort((n1,n2) => {
                if (n1.priority > n2.priority) {
                    return 1;
                }
            
                if (n1.priority < n2.priority) {
                    return -1;
                }
            
                return 0;
            });
            this.todos = sortedArray;
            console.log(this.todos);

            return true;
        }
        else {
            return false;
        }
    }

    public markTodoCompleted(todoIndex: number): void {
        //  if todoIndex
    }

    public static getTodos(): Todo[] {        
        return this.todos;
    }

    public static saveToLocalStorage(): void {
        localStorage.setItem("Allt sparas i denna key", JSON.stringify(this.todos));
    }

    public static loadFromLocalStorage(): void {
        if (localStorage.length >= 1) {
            for (let i = 0; i < localStorage.length; i++) {
   
                /*const value: string = localStorage.getItem("Allt sparas i denna key")!;
                let tempObject: Todo = ((JSON.parse(value)));*/
                this.todos.push(JSON.parse(localStorage.getItem("Allt sparas i denna key")!));
               // console.log(tempObject);
            }
        }
        console.log(this.todos);
    }

}


