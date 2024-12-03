import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import sessionsController from "../controller/sessions.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, sessionsController.addSession);
router.get("/get", sessionsController.getSession);
router.get("/get/:id", sessionsController.getSessionById);
router.get("/user", sessionsController.getUserSession);
router.put("/delete/:id", authenticateToken, sessionsController.deleteSession);

export default router;