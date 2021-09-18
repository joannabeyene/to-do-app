# to-do-app
**Om Appliationen**

Projektet är en Headless Application och är uppdelat i två mappar, frontend och backend.

Inloggning: user: 'admin', password: 'admin' user: 'lisa', password: 'lisa' user: 'kalle', password: 'kalle'

**Frontend**

start: 
npm install

**Backend**

start: 
npm install
npm nodemon

**Databas**

Databasen heter todo och innehåller tre tabeller; lists, tasks och users. De tre tabellerna innehåller foreign keys och relationen mellan dessa tabeller kan hittas i databasdump filen.

**Mina tekniska och arkitektoriska beslut:**

*Frontend*

I min FrontEnd valde jag att skapa en mapp som jag kallade för "modules", den mappen innehåller en fil "varibles.mjs" fil. I variables.mjs skapar jag alla mina globala variabler och importerar de in till min "script.js" fil. 

Tanken var att den mappen skulle även innehålla fler filer där jag delade upp mina funktioner I den filen. Jag valde att inte fördela mina funktioner till mindre mjs-filer då appen fungerar bra som den är nu, och att script.js filen har över 260 rader kod stör mig inte, men vid nästa sprint skulle man kunna separera funktionerna till mindre filer och endast använda sig av script.js som en vy fil där funktionerna importeras. 

I localstorage sparar jag den inloggade användarens id. När användaren skapar en ny lista hämtas användarens id från localstorage och läggs till "user_id" i tabellen "lists". På så sätt fetchas endast den inloggade användarens listor från databasen. Localstorage används även för att hålla den inloggade användaren kvar på sin inloggningssida vid sidans omladdning.

För att lösa så att tasks läggs till rätt lista har tabellen "lists" en primary key: "list_id" som tabellen "tasks" har som en foreignkey. Så när man vill skapa en ny task så fetchas alla skapade listor från databasen och läggs till i en select dropdown meny, där kan användaren välja vilken lista de vill lägga till en ny task. På så sätt kan list_id sättas till den nya task. Så när man hämtar alla listor och tasks så läggs tasks till rätt lists.

När en ny task skapas kan man sätta deadline datum på de. I unfinished tasks vyn kan man se när en task har passerat sin deadline, genom att datum texten blir röd.

Varje task har en checkbox, när klickar på checkboxen, ändras taskens status från false till true och sedan när man klickar på finished tasks vyn, läggs den tasken till där och försvinner från den andra listan unfinished tasks vyn hämtas igen.
Checkboxen har sin default styling. Vid nästa sprint kan stylingen på checkboxen uppdateras.

*Backend*

Jag valde att bygga upp min backend som en CRUD applikation, minus D(delete) eftersom ta bort en lista/task funktion var ej ett krav så jag valde att inte skapa en delete query. Dock är detta något som enkelt kan tilläggas vid nästa sprint.
