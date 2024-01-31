document.addEventListener("DOMContentLoaded", function () {
    showClock();
    showTasks();
});

function showClock() {
    const clockElement = document.getElementById("clock");

    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toDateString();
        clockElement.textContent = `${dateString} ${timeString}`;
    }

    setInterval(updateClock, 1000);
    updateClock();
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        const now = new Date();
        const timestamp = now.toLocaleString(); // Get the current timestamp

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText} - ${timestamp}</span>
            <button onclick="markCompleted(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(li);
        taskInput.value = "";

        saveTasks();
    }
}


function markCompleted(button) {
    const taskText = button.previousElementSibling.textContent;
    button.previousElementSibling.classList.toggle("completed");

    saveTasks();
}

function deleteTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentNode;
    taskList.removeChild(li);

    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    for (const li of taskList.children) {
        const taskText = li.firstElementChild.textContent;
        const completed = li.firstElementChild.classList.contains("completed");
        tasks.push({ text: taskText, completed: completed });
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    for (const task of tasks) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="markCompleted(this)">Done</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(li);
    }
}
