import { useState, useEffect } from 'react';

type Task = {
  id: number,
  title: string,
  description: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks')
    const tasks = await response.json();
    setTasks(tasks);
  };

  /* Complete the following functions to hit endpoints on your server */
  const createTask = async () => {
    const response = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      console.error('Failed to create task', data.message);
    }
  };

  const deleteTask = async (id: string) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      console.error('Failed to delete task', data.message);
    }
  };


  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(String(task.id))}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
        />
        <button onClick={createTask}>Create</button>
      </div>
    </div>
  );
}

export default App;
