//^ Calling Element

var taskInput = document.getElementById("taskInput");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var searchInput = document.getElementById("searchInput");
var tasksContainer = document.getElementById("tasksContainer");

//& Global Variables

var tasks = [];
if (localStorage.getItem("tasks") !== null) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks(tasks);
}
var task;
var updatedIndex;

//* Functions

//! Create and Save to localStorage

function addTask() {
  task = taskInput.value;
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
  clear();
}
//! Read and send to HTML

function displayTasks(inputs) {
  tasksContainer.innerHTML = "";
  let containerHTML = "";
  for (var i = 0; i < inputs.length; i++) {
    containerHTML += `<div
      class="task d-flex align-items-center justify-content-between pe-0 my-2 w-100"
    >
      <p class="d-inline-block mb-0 text-white">${inputs[i]}</p>
      <div>
        <button type="button" onclick="editTask(${i})">Edit</button>
        <button type="button" onclick="deleteTask(${i})">Delete</button>
      </div>
    </div>`;
  }
  tasksContainer.innerHTML = containerHTML;
}

//! Update tasks and Buttons

function editTask(index) {
  updatedIndex = index;
  taskInput.value = tasks[index];
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateTask() {
  tasks.splice(updatedIndex, 1, taskInput.value);
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
  clear();
}

//! Clear Input

function clear() {
  taskInput.value = "";
}

//! Delete Tasks
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(tasks);
}

//! Search
function searchTasks(value) {
  var searchtask = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].toLowerCase().includes(value.toLowerCase())) {
      console.log(tasks[i]);
      searchtask.push(tasks[i]);
    }
  }
  displayTasks(searchtask);
}
