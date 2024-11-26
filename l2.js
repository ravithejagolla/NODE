const fs = require('fs');
const readlineSync = require('readline-sync');

// Path to the JSON file where tasks are stored
const tasksFilePath = './tasks.json';
let userPreference = 'all'; // Default display preference

// Function to read tasks from the JSON file
function readTasks() {
  try {
    const data = fs.readFileSync(tasksFilePath, 'utf8');
    return JSON.parse(data).tasks || [];
  } catch {
    return []; // Return an empty array if file doesn't exist or is invalid
  }
}

// Function to write tasks to the JSON file
function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks }, null, 2), 'utf8');
}

// Validate date format (YYYY-MM-DD)
function isValidDate(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

// Command: Add Task
function addTask() {
  const title = readlineSync.question('Enter task title: ');
  const dueDate = readlineSync.question('Enter task due date (YYYY-MM-DD): ');

  if (!title.trim() || !isValidDate(dueDate)) {
    console.log('Error: Task title cannot be empty, and due date must follow the format YYYY-MM-DD.');
    return;
  }

  const tasks = readTasks();
  const newTask = {
    id: tasks.length + 1,
    title,
    dueDate,
    status: 'pending',
  };

  tasks.push(newTask);
  writeTasks(tasks);
  console.log(`Task "${title}" has been added successfully!`);
}

// Command: List Tasks
function listTasks() {
  const tasks = readTasks();
  const filteredTasks =
    userPreference === 'all'
      ? tasks
      : tasks.filter((task) => task.status === userPreference);

  if (filteredTasks.length === 0) {
    console.log('No tasks available.');
    return;
  }

  console.log('List of tasks:');
  filteredTasks.forEach((task) => {
    console.log(
      `ID: ${task.id} | Title: ${task.title} | Due Date: ${task.dueDate} | Status: ${task.status}`
    );
  });
}

// Command: Complete Task
function completeTask() {
  const tasks = readTasks();
  const taskIdOrTitle = readlineSync.question('Enter task ID or title to mark as completed: ');

  const task = tasks.find(
    (t) => t.id == taskIdOrTitle || t.title.toLowerCase() === taskIdOrTitle.toLowerCase()
  );

  if (!task) {
    console.log('Error: Task not found!');
    return;
  }

  task.status = 'completed';
  writeTasks(tasks);
  console.log(`Task "${task.title}" has been marked as completed.`);
}

// Command: Set Preferences
function setPreference() {
  const preference = readlineSync.question(
    'Enter preference (all, pending, completed): '
  ).toLowerCase();

  if (!['all', 'pending', 'completed'].includes(preference)) {
    console.log('Error: Invalid preference. Choose from "all", "pending", or "completed".');
    return;
  }

  userPreference = preference;
  console.log(`Preference set to show "${preference}" tasks.`);
}

// Command: Help
function showHelp() {
  console.log('Available commands:');
  console.log('1. add-task         - Add a new task');
  console.log('2. list-tasks       - List all tasks');
  console.log('3. complete-task    - Mark a task as completed');
  console.log('4. set-preference   - Set task display preference');
  console.log('5. help             - Show this help menu');
  console.log('6. exit             - Exit the application');
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
      case 'set-preference':
        setPreference();
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