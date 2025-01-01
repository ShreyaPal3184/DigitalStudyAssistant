import express from "express";
import containerController from "../controller/container.controller.js";

const router = express.Router();

router.post('/create', containerController.createContainer);

export default router;