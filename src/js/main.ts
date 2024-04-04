//importerar klassen för todo-listan
import { TodoList } from "./todolist-class";

//För att kunna läsa in formuläret
const form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;
//Knapp för att tömma listan av inlägg
const emptyLocalStorage: HTMLFormElement = document.getElementById("empty-localstorage") as HTMLFormElement;
//För att skriva in data till html och som eventlistener
const todoDiv: HTMLDivElement = (document.getElementById("todo-div") as HTMLInputElement);
const todoCompleted: HTMLDivElement = (document.getElementById("todo-completed") as HTMLInputElement);
//Knappar för att väja lista över ofärdiga eller färdiga
const completedBtn: HTMLDivElement = (document.getElementById("completed-btn") as HTMLInputElement);
const todoBtn: HTMLDivElement = (document.getElementById("todo-btn") as HTMLInputElement);
//För att dölja eller visa vilken lista som visas
const todoArticle: HTMLDivElement = (document.getElementById("todo-article") as HTMLInputElement);
const completedArticle: HTMLDivElement = (document.getElementById("completed-article") as HTMLInputElement);

//Bygger upp sidan från localstorage och aktiverar eventlisteners
document.addEventListener('DOMContentLoaded', () => {
    //Bygger upp sidan från localstorage
    buildList();
    //Eventlistener för att kunna tabort inlägg eller markera som klara
    todoDiv.addEventListener("click", (e) => {
        removeTodo(e);
    })
    //Eventlistener för att kunna tabort inlägg eller markera som klara
    todoCompleted.addEventListener("click", (e) => {
        removeTodo(e);
    })
    //Eventlistener för att visa klara inlägg och dölja ofärdiga
    completedBtn.addEventListener("click", (e) => {
        todoArticle.style.display = "none";
        completedBtn.style.textDecoration = "underline";
        completedArticle.style.display = "block";
        todoBtn.style.textDecoration = "none";
    })
    //Eventlistener för att visa ofärdiga inlägg och dölja klara
    todoBtn.addEventListener("click", (e) => {
        completedArticle.style.display = "none";
        todoBtn.style.textDecoration = "underline";
        todoArticle.style.display = "block";
        completedBtn.style.textDecoration = "none";
    })
    //Eventlistener som tömmer localstorage, rensar html-sidan och resetar arrayen med inlägg.
    emptyLocalStorage.addEventListener("click", (e) => {
        localStorage.clear();
        todoDiv.innerHTML = "";
        todoCompleted.innerHTML = "";
        TodoList.resetTodosArray();
    });

    /*Lägg till händelselyssnare på formuläret som tar bort default beteende från det och kör funktionen för att spara inlägg vid klicka på submit*/
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        addTodoList();
    });
});

//Funktion som tar bort inlägg eller markerar som klara
function removeTodo(e: MouseEvent): void {
    if ((e.target as HTMLButtonElement).classList.contains('remove-todo')) {
        let index = (e.target as HTMLElement).title;
        //Skickar med inläggets index till metoden removeTodo i klassen todolist
        TodoList.removeTodo(index);
    }
    if ((e.target as HTMLButtonElement).classList.contains('box')) {
        //Skickar med index till metoden marktodocompleted och resettar med metoden savetolocalstorage
        TodoList.markTodoCompleted(Number((e.target as HTMLElement).id));
        TodoList.saveToLocalStorage();
    }
    //Bygger upp sidan med nya arrayen
    buildList();
}

//Funktion som bygger upp todo-inläggen på sidan
function buildList(): void {
    //Laddar in från localstorage och sparar till arrayen med todos
    TodoList.loadFromLocalStorage();
    //Hämtar arrayen med todos
    let tempArray = TodoList.getTodos();
    //Rensar html
    todoDiv.innerHTML = "";
    todoCompleted.innerHTML = "";
    //Om arrayen inte är tom byggs innehållet upp utifrån arrayen. 
    if (tempArray.length > 0) {
        for (let i = 0; i < tempArray.length; i++) {
            let box: string = "";
            let disabled: string = "";
            let newDiv: HTMLDivElement = document.createElement("div");
            let whichDiv: HTMLDivElement = todoDiv;
            //Om objektet är markerat som complete blir checkboxen ifylld, disabled och den appends till en annan div.
            if (tempArray[i].completed === true) {
                box = "checked";
                disabled = "disabled";
                whichDiv = todoCompleted;
            }
            newDiv.classList.add(`priority${tempArray[i].priority}`);
            newDiv.innerHTML = `
            <p>${tempArray[i].task}</p>
            <p class="inline priority">Prioritet: ${tempArray[i].priority}</p>
            <label for="completed" class="inline">Färdig:</label>
            <input type="checkbox" class="inline box" ${disabled} ${box} id="${i}" name="completed">
            <button title="${i}" class="remove-todo">Ta bort</button>
            `;
            whichDiv.appendChild(newDiv);
        }
    };
}

//Funktion för att hämta formulärdata och checka om den är korrekt ifylld
function addTodoList(): void {
    //Hämtar input-data
    const taskInput = document.getElementById("task") as HTMLInputElement;
    const priorityInput = document.getElementById("priority") as HTMLInputElement;
    //Grundvärde sätts till false
    const completedInput: boolean = false;
    //Sparar in värdet från input-data
    const task: string = taskInput.value;
    const priority: number = parseInt(priorityInput.value);
    //Bygger nytt objekt med constructorn i klassen TodoList
    const newTodoList = new TodoList(task, completedInput, priority);
    /*Skickar med nya objectet till metoden för att se om det är korrekt ifyllt. 
    Isåfall läggs objektet till i arrayen och sorteras efter prioritet.*/
    if (TodoList.addTodo(newTodoList)) {
        //Arrayen sparas till localstorage och sidan byggs upp med den nya arrayen
        TodoList.saveToLocalStorage();
        buildList();
        //Rensar ifyllda uppgifter i formuläret
        taskInput.value = "";
        priorityInput.value = "";
    } else {
        alert("Fyll i både uppgift och prioritet!");
    }
}