document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // ---------------------------
  // Load tasks from Local Storage
  // ---------------------------
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => {
      addTask(taskText, false); // false = don’t save again when loading
    });
  }

  // ---------------------------
  // Save tasks to Local Storage
  // ---------------------------
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      // Get only the text part, not the button
      const text = li.firstChild.textContent;
      tasks.push(text);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // ---------------------------
  // Add Task function
  // ---------------------------
  function addTask(taskText, save = true) {
    // If called without param (via button/Enter), read input
    if (typeof taskText !== 'string') {
      taskText = taskInput.value.trim();
    }

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create <li>
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveTasks(); // update storage after removal
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
    taskInput.focus();

    // Save new task to Local Storage
    if (save) {
      saveTasks();
    }
  }

  // ---------------------------
  // Event Listeners
  // ---------------------------
  addButton.addEventListener('click', () => addTask());

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // ---------------------------
  // Initialize
  // ---------------------------
  loadTasks();
});
