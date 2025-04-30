const titleInput = document.getElementById('task-title');
const descriptionInput = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  displayTasks();
}

function displayTasks(filteredTasks = tasks) {
  taskList.innerHTML = '';
  filteredTasks.forEach(task => {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <strong>${task.title}</strong>: ${task.description}
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
  });
}

function addTask() {
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (!title) {
    alert('Task title cannot be empty.');
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    completed: false
  };

  tasks.push(newTask);
  saveTasks();
  displayTasks();

  titleInput.value = '';
  descriptionInput.value = '';
}

function searchTasks() {
  const query = searchInput.value.toLowerCase();
  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(query) ||
    task.description.toLowerCase().includes(query)
  );
  displayTasks(filtered);
}

document.getElementById('add-task-btn').addEventListener('click', addTask);
searchInput.addEventListener('input', searchTasks);

displayTasks();