//views
const navBar = document.getElementById('navbar');
const page = document.getElementById('page');
const listMenu = document.createElement('div');
listMenu.id = 'myLists';
const footer = document.getElementById('footer');
//buttons
const loginButton = document.getElementById('loginButton');
const logoutButton = document.createElement('button');
logoutButton.innerHTML = 'logout';
const saveButton = document.createElement('button');
saveButton.innerHTML = 'save';
const addTaskButton = document.createElement('button');
addTaskButton.innerHTML = 'add new task';
const addListButton = document.createElement('button');
addListButton.innerHTML = 'add new list';
const createTaskButton = document.createElement('button');
createTaskButton.innerHTML = 'add';
const unFinishedTasksButton = document.createElement('button');
unFinishedTasksButton.innerHTML = 'Lists with Unfinished Tasks';
const finishedTasksButton = document.createElement('button');
finishedTasksButton.innerHTML = 'Lists with Finished Tasks';
const backButton = document.createElement('button');
backButton.innerHTML = 'back';
//labels
const userLabel = document.getElementById('userLabel');
const passwordLabel = document.getElementById('passwordLabel');
const descriptionLabel = document.createElement('label');
descriptionLabel.innerHTML = 'List description: ';
const listLabel = document.createElement('label');
listLabel.innerHTML = 'Choose a list: ';
const taskLabel = document.createElement('label');
taskLabel.innerHTML = 'New task: ';
const dateLabel = document.createElement('label');
dateLabel.innerHTML = 'Due date: ';
//inputs
const userLogin = document.getElementById('userLogin');
const passwordLogin = document.getElementById('passwordLogin');
const addTask = document.createElement('input')
addTask.type = 'text';
addTask.name = 'addTask'
addTask.id = 'addTask'
const dueDate = document.createElement('input')
dueDate.type = 'date';
dueDate.name = 'dueDate'
dueDate.id = 'dueDate'
const textContent = document.createElement('textarea');
textContent.id = 'textContent';
//misc
const select = document.createElement('select')

export {page, 
    navBar, 
    footer,
    listMenu,
    userLabel, 
    userLogin, 
    passwordLabel, 
    passwordLogin, 
    loginButton, 
    logoutButton, 
    textContent,
    addTask,
    saveButton,  
    addTaskButton,  
    addListButton,
    backButton,
    descriptionLabel, 
    select,
    createTaskButton,
    dueDate,
    listLabel,
    taskLabel,
    dateLabel,
    finishedTasksButton,
    unFinishedTasksButton
}