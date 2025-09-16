import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/todoRoutes.js";
dotenv.config();
const app = express();
const PORT = 5000;

app.use(express.json());

app.use("/api/todos", router);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});