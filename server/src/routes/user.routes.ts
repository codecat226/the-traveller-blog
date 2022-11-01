import express from 'express';
import { registerUser } from '../controllers/user.controller';
import { registerUserValidaton } from '../validators/userValidation';

const router = express.Router();

// all routes start with /api/users

router.post('/register', registerUserValidaton, registerUser);
router.post('/login', registerUser);

export default router;
