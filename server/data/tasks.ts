import { v4 as uuidv4 } from "uuid";

type Task = {
  id: string;
  name: string;
  completed: boolean;
  status: "pending" | "in-progress" | "completed";
  editMode: boolean;
};

const tasks: Task[] = [
  { id: uuidv4(), name: "Learn React", completed: false, status: "pending", editMode: false },
  { id: uuidv4(), name: "Learn Express", completed: true, status: "completed", editMode: false },
];

export default tasks;