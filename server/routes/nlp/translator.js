import express from 'express';
import translateController from '../../controller/nlp/translator.controller.cjs';

const router = express.Router();

router.post('/translate', translateController.translateText);
router.post('/detect', translateController.detectLanguage);

export default router;