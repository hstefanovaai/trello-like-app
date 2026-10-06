import express, { type Express, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const router = express.Router();

// Mocked data
let tasks = [
  { id: uuidv4(), name: "Learn React", completed: false, status: "pending", editMode: false },
  { id: uuidv4(), name: "Learn Express", completed: true, status: "completed", editMode: false },
];

// Get all tasks
router.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// Create task
router.post("/tasks", (req: Request, res: Response) => {
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
router.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const task = tasks.find((task) => task.id === id);

  if(!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.completed = req.body.completed;
  task.status = req.body.status;
  task.editMode = req.body.editMode;

  res.json(task);
});

// Delete task
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  
  const taskExists = tasks.some((task) => task.id === id);

    if (!taskExists) {
    return res.status(404).json({ message: "Task not found" });
    }

  tasks = tasks.filter((task) => task.id !== id);
  res.json(tasks);
});