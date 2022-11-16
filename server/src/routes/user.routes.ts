import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { registerUserValidaton, loginUserValidaton } from '../validators/validators';
import {
  registerUser,
  loginUser,
  showProfile,
  logoutUser,
  createRefreshToken,
  verifyUser,
  forgotPassword,
  resetPassword
} from '../controllers/user.controller';

const router = express.Router();

// all routes start with /api/users

router.post('/register', registerUserValidaton, registerUser);
router.post('/verify/:token', verifyUser);
router.post('/login', loginUserValidaton, loginUser);
router.get('/profile', isAuthorised, showProfile);
router.get('/refresh', createRefreshToken, isAuthorised, showProfile);
router.post('/logout', isAuthorised, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
