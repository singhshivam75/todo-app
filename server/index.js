import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/todoRoutes.js";
import Todo from "./models/task.model.js";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/api/tasks", router);

const startServer = async () => {
  try {
    await connectDB.authenticate();
    console.log("MySQL connected...");

    await Todo.sync();
    console.log("Todo table synced");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("DB connection failed:", error.message);
  }
};

startServer();