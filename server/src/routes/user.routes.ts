import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { loginUserValidator, registerUserValidator } from '../validators/validators';
import {
  registerUser,
  loginUser,
  showProfile,
  logoutUser,
  createRefreshToken,
  verifyUser,
  resendVerifyUser,
  forgotPassword,
  resetPassword
} from '../controllers/user.controller';
import { runValidation } from '../validators';

const router = express.Router();

// all routes start with /api/users

router.post('/register', registerUserValidator, runValidation, registerUser);
router.get('/verify', verifyUser);
router.post('/resend-verify', resendVerifyUser);
router.post('/login', loginUserValidator, runValidation, loginUser);
//when showing profile, we need to check if authorised through the cookie we sent in loginUser
router.get('/profile', isAuthorised, showProfile);
router.get('/refresh', createRefreshToken, isAuthorised, showProfile);
router.post('/logout', isAuthorised, logoutUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;
