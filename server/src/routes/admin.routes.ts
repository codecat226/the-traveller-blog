import express from 'express';

import { isAuthorised } from '../middlewares/authorise';
import { loginUserValidaton } from '../validators/validators';
import { loginAdmin, showDashboard } from '../controllers/admin.controller';

const router = express.Router();

// all routes start with /api/admin

router.post('/login', loginUserValidaton, loginAdmin);
router.get('/dashboard', isAuthorised, showDashboard);

export default router;
