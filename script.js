// SIGNUP

function signup(){

let username =
document.getElementById("newUser").value.trim();

let password =
document.getElementById("newPass").value;

let confirm =
document.getElementById("confirmPass").value;

if(username === "" || password === ""){
alert("Fill all fields");
return;
}

if(password !== confirm){
alert("Passwords do not match");
return;
}

let users =
JSON.parse(localStorage.getItem("users")) || [];

let exists =
users.find(u => u.username === username);

if(exists){
alert("Username already exists");
return;
}

users.push({
username,
password
});

localStorage.setItem(
"users",
JSON.stringify(users)
);

alert("Account Created");

window.location.href =
"login.html";
}



// LOGIN

function login(){

let username =
document.getElementById("loginUser").value;

let password =
document.getElementById("loginPass").value;

let users =
JSON.parse(localStorage.getItem("users")) || [];

let user =
users.find(
u =>
u.username === username &&
u.password === password
);

if(user){

localStorage.setItem(
"currentUser",
username
);

window.location.href =
"home.html";

}else{

alert("Invalid Login");

}

}



// CHECK LOGIN

function checkLogin(){

if(!localStorage.getItem("currentUser")){

window.location.href =
"login.html";

}

}



// LOGOUT

function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href =
"login.html";

}



// SAVE ACTIVITY

function saveActivity(){

let activity =
document.getElementById("activity").value;

let day =
document.getElementById("day").value;

let start =
document.getElementById("start").value;

let end =
document.getElementById("end").value;

let username =
localStorage.getItem("currentUser");

let timetable =
JSON.parse(
localStorage.getItem("timetable")
) || [];

timetable.push({

username,
activity,
day,
start,
end

});

localStorage.setItem(
"timetable",
JSON.stringify(timetable)
);

alert("Activity Saved");

window.location.href =
"timetable.html";

}



// LOAD TIMETABLE

function loadTimetable(){

let username =
localStorage.getItem("currentUser");

let timetable =
JSON.parse(
localStorage.getItem("timetable")
) || [];

let userData =
timetable.filter(
item =>
item.username === username
);

let box =
document.getElementById("timetableList");

box.innerHTML = "";

userData.forEach((item,index)=>{

box.innerHTML += `

<div class="card">

<h3>${item.activity}</h3>

<p>${item.day}</p>

<p>${item.start} - ${item.end}</p>

<button
class="danger"
onclick="deleteActivity(${index})">
Delete
</button>

</div>

`;

});

}



// DELETE ACTIVITY

function deleteActivity(index){

let username =
localStorage.getItem("currentUser");

let timetable =
JSON.parse(
localStorage.getItem("timetable")
) || [];

let userData =
timetable.filter(
item =>
item.username === username
);

let selected =
userData[index];

let updated =
timetable.filter(
item => item !== selected
);

localStorage.setItem(
"timetable",
JSON.stringify(updated)
);

loadTimetable();

}



// SAVE TODO

function saveTodo(){

let task =
document.getElementById("task").value;

let priority =
document.getElementById("priority").value;

let username =
localStorage.getItem("currentUser");

let todos =
JSON.parse(
localStorage.getItem("todos")
) || [];

todos.push({

username,
task,
priority,
completed:false

});

localStorage.setItem(
"todos",
JSON.stringify(todos)
);

alert("Task Saved");

window.location.href =
"todo.html";

}



// LOAD TODOS

function loadTodos(){

let username =
localStorage.getItem("currentUser");

let todos =
JSON.parse(
localStorage.getItem("todos")
) || [];

let userTodos =
todos.filter(
item =>
item.username === username
);

let box =
document.getElementById("todoList");

box.innerHTML = "";

userTodos.forEach((item,index)=>{

box.innerHTML += `

<div class="card">

<h3>
${item.completed ? "✅" : "⬜"}
${item.task}
</h3>

<p>Priority: ${item.priority}</p>

<button
class="secondary"
onclick="completeTask(${index})">
Complete
</button>

<button
class="danger"
onclick="deleteTask(${index})">
Delete
</button>

</div>

`;

});

}



// COMPLETE TASK

function completeTask(index){

let username =
localStorage.getItem("currentUser");

let todos =
JSON.parse(
localStorage.getItem("todos")
) || [];

let userTodos =
todos.filter(
item =>
item.username === username
);

let selected =
userTodos[index];

selected.completed = true;

localStorage.setItem(
"todos",
JSON.stringify(todos)
);

loadTodos();

}



// DELETE TASK

function deleteTask(index){

let username =
localStorage.getItem("currentUser");

let todos =
JSON.parse(
localStorage.getItem("todos")
) || [];

let userTodos =
todos.filter(
item =>
item.username === username
);

let selected =
userTodos[index];

let updated =
todos.filter(
item => item !== selected
);

localStorage.setItem(
"todos",
JSON.stringify(updated)
);

loadTodos();

}