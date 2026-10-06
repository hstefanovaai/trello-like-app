import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Mocked data
let tasks = [
  { id: uuidv4(), name: "Learn React", completed: false, editMode: false },
  { id: uuidv4(), name: "Learn Express", completed: true, editMode: false },
];

// Get all tasks
app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// Create task
app.post("/tasks", (req: Request, res: Response) => {
  const newTask = {
    id: uuidv4(),
    name: req.body.name,
    completed: false,
    status: "pending",
    editMode:false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update task
app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.body.id)
  const task = tasks.find((task) => task.id === id);

  if(!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.completed = req.body.completed;

  res.json(task);
});

// Delete task
app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  
  const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists) {
    return res.status(404).json({ message: "Task not found" });
    }

  tasks = tasks.filter((task) => task.id !== id);
  res.json(tasks);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
