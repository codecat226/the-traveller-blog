import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const registerUserValidaton = [
  check('name').notEmpty().withMessage('Must provide name.'),
  check('email').normalizeEmail().isEmail().withMessage('Not a valid email address.'),
  check('password').notEmpty().withMessage('Must provide password.'),
  check('phone').notEmpty().withMessage('Must provide phone number.'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    // if errors IS NOT empty (if error exists)
    if (!errors.isEmpty()) {
      const validationErrors: any = {};
      const allErrors = errors.array();
      allErrors.forEach((error) => {
        validationErrors[error.param] = error.msg;
      });
      return res.status(404).json({
        validationErrors
      });
    }
    //move on to controller if errors IS empty
    return next();
  }
];
