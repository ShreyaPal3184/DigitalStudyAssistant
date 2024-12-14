import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import friendshipsController from "../controller/friendships.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, authenticateToken, friendshipsController.addFriendship);
router.post("/accept", authenticateToken, friendshipsController.acceptFriendship);

export default router;