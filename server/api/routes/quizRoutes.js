import express from 'express';
import { getquestions,addquestions,updatequestion,deletequestion } from '../controllers/quizController.js';
const router = express.Router();

router.get('/', getquestions);
router.post('/', addquestions);
router.put('/:id', updatequestion);
router.delete('/:id', deletequestion);

export default router;