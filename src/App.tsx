import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from "./api/tasks";
import type { Task } from "../types";

function App() {
  // 1.State
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    completed: false,
    status: "pending",
    editMode: false
  });

  const [tasks, setTasks] = useState<Task[]>([]);

  // 2. Fetch data
   useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  // 3. Functions
  async function handleCreate(taskName: string) {
    const task = await createTask(taskName);

    setTasks([...tasks, task]); // update FE
    setTask({ ...task, name: "" }); // reset input field
  }

  async function handleEdit(taskId: string, updatedTask: Partial<Task>) {
    await updateTask(taskId, {
      editMode: updatedTask.editMode
    });

    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  async function handleDelete(taskId: string) {
    await deleteTask(taskId);

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }

  // 4.JSX
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>

        <h3>Add new task:</h3>
        <input
          type="text"
          placeholder="Add new task..."
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          className="mt-2 p-2 border rounded"
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded"
          onClick={() => handleCreate(task.name)}
        >
          Add Task
        </button>

        <p className="mt-2 text-gray-600">
          {`You have ${tasks.length} tasks.`}
        </p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id} className="mt-4 p-4 bg-white rounded shadow">
              {task.editMode && (
                <input
                  key={task.id}
                  type="text"
                  value={task.name}
                  onChange={(e) => handleEdit(task.id, { name: e.target.value, editMode: true })}
                  onSubmit={() => handleEdit(task.id, { editMode: false })}
                  className="mt-2 p-2 border rounded"
                />
              )}

              {!task.editMode && (
                <h2 className="text-xl font-semibold text-gray-800">
                  {task.name}
                </h2>
              )}

              <p className="text-gray-600">Status: {task.status}</p>
              <p className="text-gray-600">
                Completed: {task.completed ? "Yes" : "No"}
              </p>

              <button
                className="mt-2 mr-2 p-2 bg-yellow-400 text-white rounded"
                onClick={() => {
                  handleEdit(task.id, { editMode: !task.editMode });
                }}
              >
                {task.editMode ? "Save Changes" : "Edit Task"}
              </button>

              <button
                className="mt-2 p-2 bg-red-500 text-white rounded"
                onClick={() => handleDelete(task.id)}
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
