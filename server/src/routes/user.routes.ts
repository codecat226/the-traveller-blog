import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { registerUserValidaton } from '../validators/userValidation';
import { registerUser, loginUser, showProfile, logoutUser } from '../controllers/user.controller';

const router = express.Router();

// all routes start with /api/users

router.post('/register', registerUserValidaton, registerUser);
router.post('/login', loginUser);
router.get('/profile', isAuthorised, showProfile);
router.post('/logout', isAuthorised, logoutUser);

export default router;
