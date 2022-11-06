import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { registerUserValidaton } from '../validators/userValidation';
import {
  registerUser,
  loginUser,
  showProfile,
  logoutUser,
  createRefreshToken,
  verifyUser,
  resendVerifyUser
} from '../controllers/user.controller';

const router = express.Router();

// all routes start with /api/users

router.post('/register', registerUserValidaton, registerUser);
router.get('/verify', verifyUser);
router.post('/resend-verify', resendVerifyUser);
router.post('/login', loginUser);
//when showing profile, we need to check if authorised through the cookie we sent in loginUser
router.get('/profile', isAuthorised, showProfile);
router.get('/refresh', createRefreshToken, isAuthorised, showProfile);
router.post('/logout', isAuthorised, logoutUser);

export default router;
