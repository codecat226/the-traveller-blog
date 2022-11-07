import { check } from 'express-validator';

export const registerUserValidator = [
  check('name').notEmpty().withMessage('Must provide name.'),
  check('email').notEmpty().normalizeEmail().isEmail().withMessage('Not a valid email address.'),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.'),
  check('phone').notEmpty().withMessage('Must provide phone number.')
];

export const loginUserValidator = [
  check('email').notEmpty().normalizeEmail().isEmail().withMessage('Not a valid email address.'),
  check('password')
    .notEmpty()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters.')
];
