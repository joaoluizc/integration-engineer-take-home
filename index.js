const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
let nextTaskId = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({'message': 'title is required'});
  }

  if (!description) {
    return res.status(400).json({'message': 'description is required'});
  }

  tasks.push({
    id: nextTaskId,
    title: req.body.title,
    description: req.body.description,
  });
  nextTaskId += 1;
  res.status(201).json();
});


app.delete('/tasks/:id', (req, res) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (!task) {
    return res.status(400).json({'message': 'task not found'});
  }
  tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  res.json(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (!task) {
    return res.status(400).json({'message': 'task not found'});
  }
  task.title = req.body.title;
  task.description = req.body.description;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
