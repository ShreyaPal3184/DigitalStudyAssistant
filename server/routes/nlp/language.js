import express from "express";
import languageController from "../../controller/nlp/language.controller.cjs";

const router = express.Router();

router.post("/summarize", languageController.summarizeText);

export default router;  