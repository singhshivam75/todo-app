import express from "express";
import { createTask, deleteTask, getAllTask, getTaskById, updateTask } from "../controllers/todo.controller.js";
import { searchTask } from "../controllers/search.controller.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getAllTask);
router.get("/search", searchTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;