import { Router, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";

const router = Router();

let tasks = [
  { id: uuidv4(), name: "Learn React", completed: false, editMode: false },
  { id: uuidv4(), name: "Learn Express", completed: true, editMode: false },
];

router.get("/", (req: Request, res: Response) => {
  res.json(tasks);
});

router.post("/", (req: Request, res: Response) => {
  const newTask = {
    id: uuidv4(),
    name: req.body.name,
    completed: false,
    status: "pending",
    editMode: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

router.put("/:id", (req: Request, res: Response) => {
  const id = req.body.id;
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.completed = req.body.completed;

  res.json(task);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks = tasks.filter((task) => task.id !== id);
  res.json(tasks);
});

export default router;
