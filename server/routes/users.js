import express from "express";
import dotenv from "dotenv";
import userController from "../controller/user.controller.js";

dotenv.config();

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/get", userController.getUsers);
router.get("/get/:id", userController.getUserById);
router.get("/update", userController.updateUser);

export default router;