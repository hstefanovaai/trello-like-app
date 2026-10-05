import { useEffect, useState } from "react";
import type { Task } from "../types";

function App() {
  // 1.State
  const [task, setTask] = useState<Task>({
    id: "",
    name: "",
    completed: false,
    status: "pending",
  });

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      name: "Sample Task",
      completed: false,
      status: "pending",
    },
    {
      id: "2",
      name: "Another Task",
      completed: false,
      status: "in-progress",
    },
    {
      id: "3",
      name: "Completed Task",
      completed: true,
      status: "completed",
    },
  ]);

  // 2. Fetch data
  useEffect(() => {});

  // 3. Functions
  function addTask(taskName: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setTask({ ...task, name: "" });
  }

  function deleteTask(taskId: string) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  }

  function editTask(taskId: string, updatedTask: Partial<Task>) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
    setTasks(updatedTasks);
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
          onClick={() => addTask(task.name)}
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
                onChange={(e) => editTask(task.id, { name: e.target.value })}
                onSubmit={() => editTask(task.id, { editMode: false })}
                className="mt-2 p-2 border rounded"
              />)}

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
                  editTask(task.id, { editMode: !task.editMode });
                }}
              >
                {task.editMode ? "Save Changes" : "Edit Task"}
              </button>

              <button
                className="mt-2 p-2 bg-red-500 text-white rounded"
                onClick={() => deleteTask(task.id)}
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
