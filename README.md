# to-do-app
Om Appliationen
Projektet är en Headless Application och är uppdelat i två mappar, frontend och backend.

Inloggning: user: 'admin', password: 'admin' user: 'lisa', password: 'lisa' user: 'kalle', password: 'kalle'

Frontend
start: npm install

Backend
start: npm install

Databas
Databasen heter todo och innehåller tre tabeller; lists, tasks och users. De tre tabellerna innehåller foreign keys och relationen mellan dessa tabeller kan hittas i databasdump filen.

Mina tekniska och arkitektoriska beslut:

Frontend
I min FrontEnd valde jag att skapa en mapp som jag kallade för "modules" med en fil "varibles.js" fil. I den filen skapar jag alla mina globala variabler och importerar de in till min "script.js" fil. Jag valde att inte skapa fler
filer där jag fördelar mina funktioner då appen fungerar bra som den är nu, och att script.js filen har över 200 rader kod stör mig inte, men vid nästa sprint skulle man kunna separera funktionerna till mindre filer och endast använda sig av script.js filen som en vy fil där funktionerna importeras. 

I localstorage sparar jag den inloggade användarens id som jag sedan använder mig av för att fetcha den användarens listor från databasen. När användaren skapar en ny lista hämtas användarens id från localstorage och läggs till till user_id som finns på lists som en foreign key. Localstorage används även för att hålla den inloggade användaren kvar på sin inloggningssida vid sidans omladdning.

För att lösa så att tasks läggs till rätt lista så fetchas alla skapade listor från databasen och läggs till en select dropdown meny, där kan användaren välja vilken lista de vill lägga till en ny task. På så sätt kan list id:t sättas till rätt task, så sedan när man hämtar alla listor med sina tasks så sorteras de rätt.

När en ny task skapas kan man välja ett deadline datum på tasken. Vid list och task vyn kan man sedan se när en task har passerat sin deadline datum, genom att datum texten blir röd.

Varje task har en checkbox, när klickar på checkboxen, ändras taskens status till "done" och sedan när man klickar på finished tasks vyn, läggs den tasken till där och försvinner från den andra listan vid omladdning av sidan eller när man

Backend
Jag valde att bygga upp min backend som en CRUD applikation, minus D(delete) då ta bort en lista/task var ej ett krav så jag valde att skippa skapa en delete query. Dock är detta något som enkelt kan tilläggas i framtiden vid nästa sprint.
