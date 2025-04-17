const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
const darkModeToggle = document.getElementById("dark-mode-toggle");

let cells = [];
let currentPlayer = "X";
let gameActive = true;
let isVsComputer = false; // Change to true for Player vs Computer mode
let isDarkMode = false;

function createBoard() {
  board.innerHTML = "";
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push("");
    cell.addEventListener("click", () => handleClick(i));
  }
}

function handleClick(index) {
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  updateBoard();

  if (checkWinner(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s Turn`;

  if (isVsComputer && currentPlayer === "O" && gameActive) {
    setTimeout(computerMove, 500);
  }
}

function computerMove() {
  let emptyIndices = cells.map((val, i) => (val === "" ? i : null)).filter(i => i !== null);
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleClick(move);
}

function updateBoard() {
  board.querySelectorAll(".cell").forEach((cell, i) => {
    cell.textContent = cells[i];
    if (isDarkMode) {
      cell.classList.add("dark-mode");
    } else {
      cell.classList.remove("dark-mode");
    }
  });
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );const addTaskButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const dueDateInput = document.getElementById('due-date');
  const taskList = document.getElementById('task-list');
  
  let tasks = []; // This array will store all the tasks.
  
  function renderTasks() {
    taskList.innerHTML = ''; // Clear the list before re-rendering.
  
    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task-item');
      if (task.completed) taskDiv.classList.add('completed');
  
      taskDiv.innerHTML = `
        <span>
          <strong>${task.text}</strong><br>
          <small>Due: ${task.dueDate}</small>
        </span>
        <div>
          <button onclick="editTask(${task.id})">Edit</button>
          <button onclick="deleteTask(${task.id})">Delete</button>
          <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
        </div>
      `;
  
      taskList.appendChild(taskDiv);
    });
  }
  
  // Add new task
  addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
  
    if (taskText === '') {
      alert('Please enter a task!');
      return;
    }
  
    const newTask = {
      id: Date.now(),
      text: taskText,
      dueDate: dueDate || 'No due date',
      completed: false
    };
  
    tasks.push(newTask);
    taskInput.value = '';
    dueDateInput.value = '';
  
    renderTasks();
  });
  
  // Toggle task completion
  function toggleComplete(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      renderTasks();
    }
  }
  
  // Edit task
  function editTask(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
      const newText = prompt('Edit task:', task.text);
      if (newText) {
        task.text = newText;
        renderTasks();
      }
    }
  }
  
  // Delete task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
  }
  
  // Initial render of tasks
  renderTasks();
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s Turn`;
  createBoard();
});

// Dark mode toggle
darkModeToggle.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  darkModeToggle.innerHTML = isDarkMode
    ? '<img src="https://img.icons8.com/ios-filled/24/ffffff/moon.png" alt="Moon Icon" />'
    : '<img src="https://img.icons8.com/ios-filled/24/ffffff/sun.png" alt="Sun Icon" />';
  updateBoard();
});

// Initialize board
createBoard();