import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const runValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // if errors IS NOT empty (if error exists)
  if (!errors.isEmpty()) {
    const validationErrors: string[] = errors.array().map((error) => error.msg);
    // console.log(validationErrors);
    return res.status(404).json({
      validationErrors
    });
  }
  //move on to controller if errors IS empty
  return next();
};
