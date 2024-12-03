import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "./middleware/authMiddleware.js";
import tasksController from "../controller/tasks.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, tasksController.addTask);
router.get("/get", tasksController.getTask);
router.get("/get/:id", tasksController.getTaskById);
router.get("/user", authenticateToken, tasksController.getUserTask);
router.put("/delete/:id", authenticateToken, tasksController.deleteTask);

export default router;