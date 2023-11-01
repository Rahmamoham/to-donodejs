const express = require('express');
const app = express();
const port = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// In-memory storage for tasks (replace with database or data persistence mechanism in production)
let tasks = [];

// Render the index page
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

// Create a new task
app.post('/create-task', (req, res) => {
  const { taskName } = req.body;
  const newTask = {
    id: tasks.length + 1,
    name: taskName,
  };
  tasks.push(newTask);
  res.redirect('/');
});

// Edit an existing task
app.post('/edit-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { taskName } = req.body;
  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.name = taskName;
  }
  res.redirect('/');
});

// Delete an existing task
app.post('/delete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
