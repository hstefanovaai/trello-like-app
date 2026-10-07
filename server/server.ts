import express, { type Express } from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
