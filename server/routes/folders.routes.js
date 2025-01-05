import express from "express";
import foldersController from "../controller/folders.controller.js";

const router = express.Router();

router.post("/create", foldersController.createFolder);
router.get("/", foldersController.getFolders);
router.delete("/delete/:id", foldersController.deleteFolder);
router.post("/:id/upload", foldersController.uploadFile);
router.get("/:id/files", foldersController.getFilesInFolder);
router.delete("/:folderId/files/:fileId", foldersController.deleteFile);

export default router;
