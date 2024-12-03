import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import studyTechniquesController from "../controller/studyTechniques.controller.js";

const router = express.Router();

router.get("/technique", studyTechniquesController.getTechnique);
router.get("/technique/:id", studyTechniquesController.getTechniqueById);

export default router;