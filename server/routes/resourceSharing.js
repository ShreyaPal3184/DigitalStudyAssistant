import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import resourceSharingController from "../controller/resourceSharing.controller.js";

const router = express.Router();

router.post("/upload", authenticateToken, resourceSharingController.upload.single('file'), resourceSharingController.uploadFile);
router.get("/get", resourceSharingController.getFiles);    
router.get("/get/:id", resourceSharingController.getFilesById);    
router.get("/user", authenticateToken, resourceSharingController.getUserFile);

export default router;