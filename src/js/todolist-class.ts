/*TypeScript-kod för att hantera todo-lista på webbplatsen där användaren kan spara in "att göra text", prioritet och om uppgiften är slutförd. Detta lagras till localstorage. 
Användaren kan även tabort tidigare inlägg*/

import { Todo } from "./interfaces";

//Egen typ för att säkerställa att prioritet är rätt siffra
//type PriorityRange = 1|2|3;



//Klass för att skapa objekt till todo-listan som följer interface-mallen Todo
export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: /*PriorityRange*/number;

    todos: Todo[] = [];

    constructor(task: string, completed: boolean, priority: /*PriorityRange*/number) {

        let newTask: Todo = {
            task: task,
            completed: completed,
            priority: priority
        };

      //  this.todos.push(newTask);
        this.saveToLocalStorage(newTask);
        this.loadFromLocalStorage();
        //console.log(this.todos);

    }

    addTodo(task: string, completed: boolean, priority: /*PriorityRange*/number): boolean{
        if(task.length > 0 && priority === (1|2|3)){
            return true;
        }
        else{
            return false;
        }
    }

    markTodoCompleted(todoIndex: number): void{
      //  if todoIndex
    }

    getTodos(): Todo[]{
      /*  if (localStorage.length >= 1) {
            for (let i = 0; i < localStorage.length; i++) {
                // set iteration key name
                const key: string = localStorage.key(i)!;
                // use key name to retrieve the corresponding value
                const value: string = localStorage.getItem(key)!;
                this.todos((JSON.parse(value)));
            }
        }*/
        return 
    }

    saveToLocalStorage(saveTask: Todo): void{

        //console.log(testDescription);
         //Localstorage sparar todo-datan
         localStorage.setItem(saveTask.task, JSON.stringify(saveTask));
    }

    loadFromLocalStorage(): void{
        if (localStorage.length >= 1) {
            for (let i = 0; i < localStorage.length; i++) {
                // 
                const key: string = localStorage.key(i)!;
                // 
                const value: any = localStorage.getItem(key)!;
                let tempObject: Todo = ((JSON.parse(value)));
                this.todos.push(tempObject);
                console.log(tempObject);
            }
        }
        console.log(this.todos);
    }

}


