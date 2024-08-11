import express from 'express';
import { login, register,getUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/:id',getUser)

export default router;