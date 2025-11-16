// To‑Do List Application Logic
// ------------------------------------------------------------
// This script provides the core functionality for the simple
// To‑Do List app. It interacts with the DOM elements defined in
// `index.html` and persists data using `localStorage`.

// -----------------------------------------------------------------
// DOM element references
// -----------------------------------------------------------------
const newTaskInput = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// -----------------------------------------------------------------
// Internal state – an array of Task objects
// -----------------------------------------------------------------
let tasks = [];

// -----------------------------------------------------------------
// Task model – each task has a unique id, text, and completed flag
// -----------------------------------------------------------------
class Task {
  /**
   * @param {string} text – The description of the task
   */
  constructor(text) {
    // Use a timestamp combined with a random component to avoid collisions
    this.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.text = text;
    this.completed = false;
  }
}

// -----------------------------------------------------------------
// Persistence helpers – load from / save to localStorage
// -----------------------------------------------------------------
function loadTasks() {
  const stored = localStorage.getItem('todoTasks');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Ensure we have an array; fallback to empty array otherwise
      if (Array.isArray(parsed)) {
        tasks = parsed.map(t => Object.assign(new Task(t.text), t));
        tasks.forEach(renderTask);
      }
    } catch (e) {
      console.error('Failed to parse stored tasks:', e);
    }
  }
}

function saveTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

// -----------------------------------------------------------------
// UI rendering – create a list‑item for a task and wire up events
// -----------------------------------------------------------------
function renderTask(task) {
  // Create the container <li>
  const li = document.createElement('li');
  li.className = 'task-item';
  if (task.completed) li.classList.add('completed');
  li.dataset.id = task.id; // store id for easy lookup later

  // Checkbox for completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'complete-checkbox';
  checkbox.dataset.id = task.id;
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleComplete(task.id));

  // Span for the task text
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.dataset.id = task.id;
  deleteBtn.textContent = '✖';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  // Assemble the element
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  // Append to the list
  taskList.appendChild(li);
}

// -----------------------------------------------------------------
// Core actions – add, toggle completion, delete
// -----------------------------------------------------------------
function addTask() {
  const text = newTaskInput.value.trim();
  if (!text) return; // ignore empty input

  const task = new Task(text);
  tasks.push(task);
  renderTask(task);
  newTaskInput.value = '';
  saveTasks();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  task.completed = !task.completed;

  // Update the DOM representation
  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li) {
    if (task.completed) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
  }

  saveTasks();
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return;

  tasks.splice(index, 1);

  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li && li.parentNode) {
    li.parentNode.removeChild(li);
  }

  saveTasks();
}

// -----------------------------------------------------------------
// Event listeners for adding tasks via button click or Enter key
// -----------------------------------------------------------------
addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

// -----------------------------------------------------------------
// Initialise the UI on page load
// -----------------------------------------------------------------
loadTasks();

// Export functions globally (optional, but keeps the API simple)
window.todoApp = {
  addTask,
  deleteTask,
  toggleComplete,
  loadTasks,
  saveTasks,
  tasks,
};
