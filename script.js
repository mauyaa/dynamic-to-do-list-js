// Wait until the DOM is fully loaded before running any code
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList  = document.getElementById('task-list');

  /**
   * addTask()
   * - Reads and trims the input value
   * - Validates it (alerts if empty)
   * - Creates an <li> with text and a "Remove" button
   * - Appends to the #task-list
   * - Clears the input
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn'); // ✅ use classList.add

    // When clicked, remove this task from the list
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Add button into the <li>, then append <li> to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = '';
    taskInput.focus();
  }

  // ✅ Attach Event Listeners
  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Only call addTask on load if input has pre-filled text (to avoid empty alert)
  if (taskInput.value.trim() !== '') {
    addTask();
  }
});
