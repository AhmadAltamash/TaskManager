import express from "express";
import { getTasks, createTask, getTaskById, updateTask, deleteTask, getStreamingData } from "../controllers/task.controller.js";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/streaming", getStreamingData);

export default router;
