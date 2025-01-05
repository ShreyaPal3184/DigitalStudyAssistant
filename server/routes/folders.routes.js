import express from "express";
import foldersController from "../controller/folders.controller.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, foldersController.createFolder);
router.get("/get", authenticateToken, foldersController.getFolders);
router.delete("/delete-folder/:id", authenticateToken, foldersController.deleteFolder);
router.post("/upload-file/:id", authenticateToken, foldersController.upload.single('file'), foldersController.uploadFile);
router.get("/get-files/:id", authenticateToken, foldersController.getFilesInFolder);
router.delete("/delete-file/:folderId/:fileId", authenticateToken, foldersController.deleteFile);

export default router;
