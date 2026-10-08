import { Request, Response } from "express";
import tasks from "../data/tasks";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../data/tasks";

export const getTasks = (req: Request, res: Response) => {
  res.json(tasks);
};

export const createTask = (req: Request, res: Response) => {
  const newTask: Task = {
    id: uuidv4(),
    name: req.body.name,
    completed: false,
    status: "pending",
    editMode: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
  const id = req.body.id;
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.name = req.body.name;
  task.completed = req.body.completed;

  res.status(200).json(task);
};

export const deleteTask = (req: Request, res: Response) => {
  const id = req.params.id;

  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({ message: "Task not found" });
  }

  const updatedTasks = tasks.filter((task) => task.id !== id);
  res.status(200).json(updatedTasks);
};
