const fs = require('fs');
const readlineSync = require('readline-sync');
// Path to the JSON file where tasks are stored
const tasksFilePath = './tasks.json';

// Function to read tasks from the JSON file
function readTasks() {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    const tasks = JSON.parse(data);

    // Handle case where tasks are nested inside another 'tasks' object
    if (tasks.tasks && tasks.tasks.tasks && Array.isArray(tasks.tasks.tasks)) {
      return { tasks: tasks.tasks.tasks };
    } else {
      return { tasks: [] }; // Return a default object if structure is invalid
    }
  } catch (error) {
    console.log('Error reading tasks:', error); // Add error logging
    return { tasks: [] }; // Return a default structure in case of error
  }
}

// Function to write tasks to the JSON file
function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks: { tasks: tasks } }, null, 2), 'utf8');
}

// Command: Add Task
function addTask() {
  const title = readlineSync.question('Enter task title: ');
  const dueDate = readlineSync.question('Enter task due date: ');

  // Validate input
  if (!title || !dueDate) {
    console.log('Task title and due date cannot be empty.');
    return;
  }

  const tasks = readTasks();

  if (!Array.isArray(tasks.tasks)) {
    console.log('Error: tasks.tasks is not an array.');
    return;
  }

  const newTask = {
    id: tasks.tasks.length + 1,
    title,
    dueDate,
    status: 'pending',
  };
  tasks.tasks.push(newTask);

  writeTasks(tasks.tasks);
  console.log(`Task "${title}" has been added successfully!`);
}

// Command: List Tasks
function listTasks() {
  const tasks = readTasks();

  if (tasks.tasks.length === 0) {
    console.log('No tasks available.');
    return;
  }

  console.log('List of tasks:');
  tasks.tasks.forEach((task) => {
    console.log(`ID: ${task.id} | Title: ${task.title} | Due Date: ${task.dueDate} | Status: ${task.status}`);
  });
}

// Command: Complete Task
function completeTask() {
  const tasks = readTasks();
  const taskIdOrTitle = readlineSync.question('Enter task ID or title to mark as completed: ');

  const task = tasks.tasks.find(
    (t) => t.id == taskIdOrTitle || t.title.toLowerCase() === taskIdOrTitle.toLowerCase()
  );

  if (!task) {
    console.log('Task not found!');
    return;
  }

  task.status = 'completed';
  writeTasks(tasks.tasks);
  console.log(`Task "${task.title}" has been marked as completed.`);
}

// Command: Update Task
function updateTask() {
  const tasks = readTasks();
  const taskIdOrTitle = readlineSync.question('Enter task ID or title to update: ');

  const task = tasks.tasks.find(
    (t) => t.id == taskIdOrTitle || t.title.toLowerCase() === taskIdOrTitle.toLowerCase()
  );

  if (!task) {
    console.log('Task not found!');
    return;
  }

  const newTitle = readlineSync.question(`Enter new title (leave blank to keep "${task.title}"): `) || task.title;
  const newDueDate = readlineSync.question(`Enter new due date (leave blank to keep "${task.dueDate}"): `) || task.dueDate;

  task.title = newTitle;
  task.dueDate = newDueDate;

  writeTasks(tasks.tasks);
  console.log(`Task "${task.title}" has been updated successfully.`);
}

// Command: Delete Task
function deleteTask() {
  const tasks = readTasks();
  const taskIdOrTitle = readlineSync.question('Enter task ID or title to delete: ');

  const taskIndex = tasks.tasks.findIndex(
    (t) => t.id == taskIdOrTitle || t.title.toLowerCase() === taskIdOrTitle.toLowerCase()
  );

  if (taskIndex === -1) {
    console.log('Task not found!');
    return;
  }

  const deletedTask = tasks.tasks.splice(taskIndex, 1);
  writeTasks(tasks.tasks);
  console.log(`Task "${deletedTask[0].title}" has been deleted.`);
}

// Command: Search Tasks
function searchTasks() {
  const tasks = readTasks();
  const query = readlineSync.question('Enter title or due date to search: ').toLowerCase();

  const results = tasks.tasks.filter(
    (t) => t.title.toLowerCase().includes(query) || t.dueDate.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    console.log('No matching tasks found.');
    return;
  }

  console.log('Matching tasks:');
  results.forEach((task) => {
    console.log(`ID: ${task.id} | Title: ${task.title} | Due Date: ${task.dueDate} | Status: ${task.status}`);
  });
}

// Command: Help
function showHelp() {
  console.log('Available commands:');
  console.log('1. add-task         - Add a new task');
  console.log('2. list-tasks       - List all tasks');
  console.log('3. complete-task    - Mark a task as completed');
  console.log('4. update-task      - Update a task');
  console.log('5. delete-task      - Delete a task');
  console.log('6. search-tasks     - Search tasks by title or due date');
  console.log('7. help             - Show this help menu');
  console.log('8. exit             - Exit the application');
}

// Function to display the welcome message and prompt for commands
function runApp() {
  console.log('Welcome to the Task Management App!');
  console.log('Type "help" to see the list of commands.');

  let command;
  do {
    command = readlineSync.question('Enter a command: ').toLowerCase();

    switch (command) {
      case 'add-task':
        addTask();
        break;
      case 'list-tasks':
        listTasks();
        break;
      case 'complete-task':
        completeTask();
        break;
      case 'update-task':
        updateTask();
        break;
      case 'delete-task':
        deleteTask();
        break;
      case 'search-tasks':
        searchTasks();
        break;
      case 'help':
        showHelp();
        break;
      case 'exit':
        console.log('Goodbye!');
        break;
      default:
        console.log('Invalid command. Type "help" to see the list of commands.');
    }
  } while (command !== 'exit');
}

// Initialize the application
runApp();
