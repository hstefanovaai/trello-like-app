import { Router, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers";

import tasks from "../data/tasks";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
