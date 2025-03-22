const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const taskList = document.getElementById("taskList");
const noTasksMessage = document.getElementById("noTasksMessage");

// Загружаем задачи из Local Storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
  updateNoTasksMessage(tasks.length === 0);
}

// Добавляем задачу в DOM
function addTaskToDOM(taskText, completed = false) {
  const newTask = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  newTask.append(checkbox, taskText);
  taskList.append(newTask);
}

// Обновляем сообщение о наличии задач
function updateNoTasksMessage(isEmpty) {
  noTasksMessage.style.display = isEmpty ? "block" : "none";
  clearButton.disabled = isEmpty;
}

// Добавляем задачу
addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToDOM(taskText);
    taskInput.value = "";
    updateNoTasksMessage(false);
    clearButton.disabled = false;
  }
});

// Обработка клика по чекбоксу
taskList.addEventListener("change", function (event) {
  if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
    const li = event.target.parentElement;
    const taskText = li.textContent.trim();
    const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    const taskIndex = tasks.findIndex((task) => task.text === taskText);
    if (taskIndex > -1) {
      tasks[taskIndex].completed = event.target.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }
});

// Очистка списка задач
clearButton.addEventListener("click", function () {
  localStorage.removeItem("tasks");
  taskList.innerHTML = "";
  updateNoTasksMessage(true);
});

// Инициализация
loadTasks();
