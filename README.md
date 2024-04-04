# Moment 2 i kursen DT008G, Programmering i TypeScript

### Webbplatsen
På den här webbplatsen kan du lagra Att göra-notiser med text och prioritet. Inlägg som är klarmarkerade sparas i en separat lista.

### Min lösning innehåller i stora drag:
* Eventlisteners för knappar och formulär
* Funktionerna:
  * removeTodo() Funktion som gör att när en "ta bort"-knapp trycks på tas tillhörande inlägg bort. Eller om en checkbox markeras blir completed i Todo-objektet ändrat till true.
  * buildList() Huvud funktionen för att bygga html innehåll på sidan. Här hämtas arrayen med todos och utifrån den väljs vilken information som ska skrivas ut på sidan. Här väljs vilken lista som todon ska skrivas ut till beroende på om den är klarmarkerad.
  * addTodoList() Här läses data in från formuläret och checkas för fel innan den läggs till i arrayen.
* Interfacet Todo som sätter villkoren för object
* Klassen TOdoList som implementerar interfacet Todo.
  * todos: Todo[] är arrayen av objekt som innehåller todo-listan
  * constructor används för att bygga nya object enligt interfacet Todo
  * Metod addTodo: Returnerar true om formuläret är rätt ifyllt och då även sorterar och pushar till arrayen med todos.
  * Metod resetTodosArray: Resetar arrayen med todo-inlägg
  * Metod removeTodo: Tar bort ett index i arrayen och initierar savetolocalstorage metoden
  * Metod markTodoCompleted: För att ändra/byta ett object i arrayen så att det är markerat som färdigt (true) 
  * Metod getTodos: Returnerar todo-arrayen
  * Metod saveToLocalStorage: Sparar arrayen till localstorage med ett dåligt namn som key
  * Metod loadFromLocalStorage: Laddar upp hela listan från arrayen och sparar över den till todos-arrayen

Koden innehåller många kommentarer som kan svara om fler frågor finns för webbplatsen. 

## Markus Vickman
Jag läser till en högskoleexamen i datateknik med inriktning webbutveckling på mittuniversitet.

### Student ID: mavi2302
