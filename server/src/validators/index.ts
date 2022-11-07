import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationErrors: string[] = errors.array().map((error) => error.msg);
    return res.status(404).json({
      validationErrors
    });
  }
  return next();
};
