import { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { toast } from 'sonner';

type Task = {
  id: number,
  title: string,
  description: string
}

function App() {
  // tasks fetched from backend
  const [tasks, setTasks] = useState<Task[]>([]);
  // details of a new task
  const [formData, setFormData] = useState({ title: '', description: '' });
  // details of a task to be updated
  const [updateFormData, setUpdateFormData] = useState({ title: '', description: '' });
  // id of a task to be updated
  const [updateId, setUpdateId] = useState<number | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks')
    const tasks = await response.json();
    setTasks(tasks);
  };

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
      setFormData({ title: '', description: '' });
    } else {
      const data = await response.json();
      toast("Failed to create task", {
        description: data.message,
      })
    }
  };

  const deleteTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      toast("Failed to delete task", {
        description: data.message,
      })
    }
  };

  const updateTask = async (id: number) => {
    const response = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateFormData),
    });
    if (response.ok) {
      fetchTasks();
      setUpdateId(null);
    } else {
      const data = await response.json();
      toast("Failed to update task", {
        description: data.message,
      })
    }
  };

  const prepareUpdateTask = (id: number) => {
    setUpdateId(id);
    const task = tasks.find(task => task.id === id);
    setUpdateFormData({ title: task!.title, description: task!.description });
  }

  return (
    <div className="h-full w-2/3 p-5 m-auto">
      <h1 className="text-left font-extrabold text-3xl">Task Management App</h1>
      <div id="content-wrapper" className="flex gap-5">
        <div id="add-update-wrapper"className={`sticky top-0 mt-2 h-fit ${tasks.length === 0 ? 'w-full' : 'w-4/12'}`}>
          <div id="add-task-wrapper" className="h-fit rounded-md p-3 border">
            <h2 className="font-bold mb-5 text-2xl text-center">Create Task</h2>
            <div id="add-task-input-wrapper" className="flex flex-col gap-5">
              <Input
                className=""
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
              <Textarea
                className="h-24"
                placeholder="Description"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
              <Button onClick={createTask}>Create</Button>
            </div>
          </div>
          {updateId && (
            <div id="update-task-wrapper" className="h-fit rounded-md p-3 mt-2 border">
              <h2 className="font-bold mb-5 text-2xl text-center">Update Task</h2>
              <div id="update-task-input-wrapper" className="flex flex-col gap-5">
                <Input
                  type="text"
                  placeholder="Title"
                  value={updateFormData.title}
                  onChange={e => setUpdateFormData({ ...updateFormData, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={updateFormData.description}
                  onChange={e => setUpdateFormData({ ...updateFormData, description: e.target.value })}
                />
                <Button onClick={() => updateTask(updateId)}>Save</Button>
              </div>
            </div>
          )}
        </div>
        <ul className={tasks.length === 0 ? 'w-0' : 'w-8/12'}>
          {tasks.map(task => (
            <li key={task.id} className="flex flex-col gap-2 p-5 mt-2 rounded-lg border">
              <h3 className="font-bold text-xl">{task.title}</h3>
              <p>{task.description}</p>
              <div className="flex gap-5 justify-end w-full">
                <Button variant="secondary" onClick={() => prepareUpdateTask(task.id)}>Update</Button>
                <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
