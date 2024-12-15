import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import friendshipsController from "../controller/friendships.controller.js";

const router = express.Router();

router.post("/add", authenticateToken, authenticateToken, friendshipsController.addFriendship);
router.post("/accept", authenticateToken, friendshipsController.acceptFriendship);
router.get("/reject", authenticateToken, friendshipsController.rejectFriendship);
router.get("/get", authenticateToken, friendshipsController.getFriends);
router.get("/requests", authenticateToken, friendshipsController.getRequests);

export default router;