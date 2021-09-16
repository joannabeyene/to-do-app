//CREATED VARIBLES IMPORTED FROM MODULES VARIBLES FOLDER
import {page, footer, listMenu, select, navBar, userLabel, passwordLabel, userLogin, passwordLogin, loginButton, logoutButton, textContent, saveButton, addTaskButton, addListButton, descriptionLabel, backButton, createTaskButton, listLabel, taskLabel, dateLabel, addTask, dueDate, finishedTasksButton, unFinishedTasksButton} from './modules/varibles.mjs';
// TO STOP THE RELOAD OF PAGE WHILE USER IS STILL LOGGED IN
if (localStorage.getItem("userId") !== null) {
    userPage();
}
//**************************FUNCTIONS*******************************************
//LANDING PAGE WITH THE USER LOGIN FORM
function landingPage () {
    clear()
    navBar.innerHTML= `<h1>To-do app</h1>`;
    page.appendChild(userLabel);
    page.appendChild(userLogin);
    page.appendChild(passwordLabel);
    page.appendChild(passwordLogin);
    page.appendChild(loginButton);
}
//USERPAGE VIEW WITH LISTS OF UNFINISHED TASKS
function userPage () {
    let loggedUser = JSON.parse(localStorage.getItem('user'));
    clear();
    navBar.innerHTML= `<h1>To-do app</h1>`;
    navBar.appendChild(addListButton);
    navBar.appendChild(addTaskButton);
    navBar.appendChild(finishedTasksButton);
    navBar.appendChild(unFinishedTasksButton);
    page.innerHTML= `<h2>Welcome <span class='username'> ${loggedUser}</span> to your page!</h2>`;
    footer.appendChild(logoutButton);
}
//USERPAGE VIEW WITH LISTS OF FINISHED TASKS
function finishedTasks(){
    let loggedUserId = localStorage.getItem('userId');
    clear();
    navBar.innerHTML= `<h1>To-do app</h1>`;
    navBar.appendChild(addListButton);
    navBar.appendChild(addTaskButton);
    navBar.appendChild(unFinishedTasksButton);
    page.innerHTML=`<h1>Lists with<span class= spanDone> DONE</span> Tasks:</h1>`;
    footer.appendChild(logoutButton);
    footer.appendChild(backButton);
    const fetchLists = fetch('http://localhost:3000/tododb/getLists')
    const fetchTasks = fetch('http://localhost:3000/tododb/getTasks')
    Promise.all([fetchLists, fetchTasks]).then(data => {
        return Promise.all(data.map(res => res.json()))
    }).then(([lists, tasks]) => {
        for(let list in lists) {
            if (loggedUserId == lists[list].user_id) {
                listMenu.insertAdjacentHTML('beforeend', "<h2 id='"+lists[list].list_id+"'>"+ lists[list].description+"</h2>")
                for(let task in tasks){
                    if(lists[list].list_id == tasks[task].list_id && tasks[task].status==true) {
                        listMenu.insertAdjacentHTML('beforeend', "<li class=lidonestyle> <span class=check>&#10004;</span>"+tasks[task].task +"</li>")
                    }
                }
            }
            page.appendChild(listMenu);
        }
    });
}
//USERPAGE VIEW WITH LISTS OF UNFINISHED TASKS
function unfinishedTasks(){
    clear();
    navBar.innerHTML= `<h1>To-do app</h1>`;
    navBar.appendChild(addListButton);
    navBar.appendChild(addTaskButton);
    navBar.appendChild(finishedTasksButton);
    page.innerHTML=`<h1>Lists with <span class=spanNotDone>NOT DONE</span> Tasks:</h1>`;
    footer.appendChild(logoutButton);
    footer.appendChild(backButton);
    let loggedUserId = localStorage.getItem('userId');
    const fetchLists = fetch('http://localhost:3000/tododb/getLists')
    const fetchTasks = fetch('http://localhost:3000/tododb/getTasks')
    Promise.all([fetchLists, fetchTasks]).then(data => {
        return Promise.all(data.map(res => res.json()))
    }).then(([lists, tasks]) => {
        for(let list in lists) {
            if (loggedUserId == lists[list].user_id) {
                listMenu.insertAdjacentHTML('beforeend', "<h3 id='"+lists[list].list_id+"'>"+"<strong>" + lists[list].description + "</strong>"+"</h3>")
                for(let task in tasks){
                    if(lists[list].list_id == tasks[task].list_id && tasks[task].status==false) {
                        let date = new Date(tasks[task].date).toLocaleDateString('sv-SE')
                        let todaysDate = new Date().toLocaleDateString('sv-SE')
                        if(date<todaysDate){
                            listMenu.insertAdjacentHTML('beforeend', "<li class=listyle>"+ tasks[task].task +"<strong>"+ " due date: "+"</strong>"+"<span style=color:red>"+date+ "</span>"+" "+"<input type='checkbox' class='done' id='"+tasks[task].task_id+"'/>"+"</li>")
                        }else {
                            listMenu.insertAdjacentHTML('beforeend', "<li class=listyle>"+ tasks[task].task + "<span>"+"<strong>"+" due date: "+"</strong>"+date+ "</span>"+" "+"<input type='checkbox' class='done' id='"+tasks[task].task_id+"'/>"+"</li>")
                        }
                    }
                }
            }
            page.appendChild(listMenu);
        }
    });
}
//ADD NEW LIST WITH THE WYSIWYG EDITOR VIEW
function textEditor() {
    clear();
    navBar.innerHTML= `<h1>To-do app</h1>`;
    navBar.appendChild(addTaskButton);
    navBar.appendChild(unFinishedTasksButton);
    navBar.appendChild(finishedTasksButton);
    page.innerHTML=`<h1>Create a new List:</h1>`;
    page.appendChild(descriptionLabel);
    page.appendChild(textContent);
    page.appendChild(saveButton);
    footer.appendChild(logoutButton);
    footer.appendChild(backButton);
    tinymce.remove();
    tinymce.init({
        selector: '#textContent',
        setup: function(editor) {
            editor.on('change', function () {
                editor.save();
            })
        }
    });
}
//ADD NEW TASK VIEW
function addNewTasks(){
    clear();
    navBar.innerHTML= `<h1>To-do app</h1>`;
    navBar.appendChild(addListButton);
    navBar.appendChild(unFinishedTasksButton);
    navBar.appendChild(finishedTasksButton);
    page.innerHTML=`<h1>Create new Tasks to your Lists:</h1>`;
    page.appendChild(listLabel);
    page.appendChild(select);
    page.appendChild(taskLabel);
    page.appendChild(addTask);
    page.appendChild(dateLabel);
    page.appendChild(dueDate);
    page.appendChild(createTaskButton);
    footer.appendChild(logoutButton);
    footer.appendChild(backButton);
    fetch('http://localhost:3000/tododb/getLists')
    .then(res=>res.json())
    .then(lists=>{
        for(let i in lists) {
            let loggedUserId = localStorage.getItem('userId');
            if (loggedUserId == lists[i].user_id) {
                select.insertAdjacentHTML('beforeend', "<option id='"+lists[i].list_id+"' value='"+lists[i].list_id+"'>" + lists[i].description + "</option>")
            }
        }
    });
}
//CLEAR FUNCTION
function clear(){
    navBar.innerHTML = '';
    page.innerHTML = '';
    footer.innerHTML = '';
    userLogin.value = '';
    passwordLogin.value = '';
    listMenu.innerHTML= '';
    select.innerHTML = '';
    addTask.value = '';
    dueDate.value = '';
}
//**************************ADDEVENTLISTENERs**********************************************
listMenu.addEventListener('click', event =>{
    if (event.target.classList.contains('done')) {
        let clickedDoneButton= event.target.id;
        let updateStatus= {
            task_id: clickedDoneButton,
            status: 1
        }
        fetch('http://localhost:3000/tododb/getTasks/update', {
            headers: {
            'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(updateStatus)
            }).then(res => res.json())
            .then(data => console.log(data)
        );
    }
})
//LOGIN BUTTON
loginButton.addEventListener('click', function () {
    let loginUser = {
        user: userLogin.value,
        password: passwordLogin.value
    };
    fetch('http://localhost:3000/tododb/getUsers')
    .then(res=>res.json())
    .then(users=>{
        for(let i in users) {
            if (loginUser.user == users[i].user && loginUser.password == users[i].password) {
                localStorage.setItem('userId', JSON.stringify(users[i].user_id));
                localStorage.setItem('user', JSON.stringify(users[i].user));
                userPage();
            }
        }
    });
})
//LIST WITH UNCHECKED TASKS VIEW
unFinishedTasksButton.addEventListener('click', function(){
    unfinishedTasks();
})
//LIST WITH CHECKED TASKS VIEW
finishedTasksButton.addEventListener('click', function(){
    finishedTasks();
})
//BACK TO USERPAGE VIEW BUTTON
backButton.addEventListener('click', function () {
    userPage();
})
//ADD A NEW LIST VIEW BUTTON 
addListButton.addEventListener('click', function () {
    textEditor();
})
//WYSIWYG EDITOR'S SAVE BUTTON, ADDS NEW LIST TO DATABASE
saveButton.addEventListener('click', function () {
    let loggedUserId = localStorage.getItem('userId');
    let text = [{
        user_id: loggedUserId,
        description: textContent.value
    }]
    localStorage.setItem('description', JSON.stringify(textContent.value));
    fetch('http://localhost:3000/tododb/getLists/add', {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(text)
    }).then(res => res.json())
    .then(data => console.log(data)
    );
    addNewTasks();
})
//ADD A NEW TASK VIEW BUTTON
addTaskButton.addEventListener('click', function () {
    addNewTasks();
})
//ADD THE CREATED TASK TO DATABASE BUTTON
createTaskButton.addEventListener('click', function(){
    let newTask= {
        list_id: select.value,
        task: addTask.value,
        date: dueDate.value,
        status: 0
    }
    fetch('http://localhost:3000/tododb/getTasks/add', {
        headers: {
        'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(newTask)
        }).then(res => res.json())
        .then(data => console.log(data)
    );
    page.insertAdjacentHTML('beforeend', "<p>"+addTask.value +" has been added to a list"+"</p>");
    addTask.value = '';
    dueDate.value = '';
    // userPage();
}) 
//LOGOUT BUTTON, TAKES YOU BACK TO THE LANDING PAGE
logoutButton.addEventListener('click', function () {
    clear()
    localStorage.clear();
    landingPage();
})