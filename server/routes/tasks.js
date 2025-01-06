import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import tasksController from "../controller/tasks.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, tasksController.addTask);
router.get("/get", tasksController.getTask);
router.get("/get/:id", tasksController.getTaskById);
router.get("/user", authenticateToken, tasksController.getUserTask);
router.delete("/delete/:id", authenticateToken, tasksController.deleteTask);
router.put("/update/:id", authenticateToken, tasksController.updateTask);

export default router; 