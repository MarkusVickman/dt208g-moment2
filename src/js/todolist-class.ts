/*TypeScript-kod för att hantera todo-lista på webbplatsen där användaren kan spara in "att göra text", prioritet och om uppgiften är slutförd. Detta lagras till localstorage. 
Användaren kan även tabort tidigare inlägg*/

//Importerar interface till klassen
import { Todo } from "./interfaces";

//Klass för att skapa objekt till todo-listan som följer interface-mallen Todo
export class TodoList implements Todo {
    task: string;
    completed: boolean;
    priority: number;
    // array med object som följer interfacet. Lisa med todos.
    private static todos: Todo[] = [];

    //Contructorn används för att kontrollera/bygga object
    constructor(task: string, completed: boolean, priority: number) {
        this.task = task;
        this.completed = completed;
        this.priority = priority;
    }
    //Metod som returnerar true om formuläret är rätt ifyllt och då även sorterar och buckar till arrayen med todos.
    //Jag valde att ta object: todo som input för att jag tyckte att det blev bättre så
    public static addTodo(addNew: Todo): boolean {
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
            return true;
        }
        else {
            return false;
        }
    }
    //Metod som resetar arrayen med todo-inlägg
    public static resetTodosArray(): void {
        let tempTodos: Todo[] = [];
        this.todos = tempTodos;
    }
    //Metod som tar bort ett index i arrayen och initierar savetolocalstorage metoden
    public static removeTodo(index): void {
        this.todos.splice(index, 1);
        this.saveToLocalStorage();
    }
    //Metod för att ändra/byta ett object i arrayen så att det är markerat som färdigt (true) 
    public static markTodoCompleted(todoIndex: number): void {
        const tempObject = this.todos[todoIndex];
        const newTodoList = new TodoList(tempObject.task, true, tempObject.priority);
        this.todos.splice(todoIndex, 1, newTodoList);
    }
    //En metod som returnerar todo-arrayen
    public static getTodos(): Todo[] {
        return this.todos;
    }
    //Metod som sparar arrayen till localstorage med ett dåligt namn som key
    public static saveToLocalStorage(): void {
        localStorage.setItem("Allt sparas i denna key", JSON.stringify(this.todos));
    }
    //Laddar upp hela listan från arrayen och sparar över den till todos-arrayen
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
    }

}


