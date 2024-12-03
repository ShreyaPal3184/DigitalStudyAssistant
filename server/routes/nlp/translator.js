import express from 'express';
import translateController from '../../controller/nlp/translator.controller.cjs';

const router = express.Router();

router.post('/translate', translateController.translateText);

export default router;