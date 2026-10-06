import type { Task } from "../../types";

const API_URL = "http://localhost:3000";

export async function getTasks() {
  const response = await fetch(`${API_URL}/tasks`);
  return response.json()
}

export async function createTask(taskName: string) {
  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: taskName }),
  });
  return response.json();
}

export async function updateTask(taskId: string, updatedTask: Partial<Task>) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  return response.json();
}

export async function deleteTask(taskId: string) {
  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });

  return response.json();
}