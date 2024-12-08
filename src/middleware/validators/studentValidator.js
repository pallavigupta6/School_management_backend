import { body } from 'express-validator';
import { validateRequest } from '../validateRequest.js'; // Ensure this file exists and exports the necessary middleware

export const validateStudent = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),

  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Gender must be either male, female, or other'),

  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date')
    .optional(),


  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .matches(/^\+?[\d\s-]+$/)
    .withMessage('Please provide a valid phone number'),

  body('class')
    .isMongoId()
    .withMessage('Please provide a valid class ID')
    .optional(),

  body('feesPaid')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Fees paid must be a non-negative number')
    .optional(),


  body('feesHistory')
    .optional()
    .isArray()
    .withMessage('Fees history must be an array')
    .optional(),


  body('feesHistory.*.amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Fee amount must be a non-negative number')
    .optional(),


  body('feesHistory.*.date')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date')
    .optional(),


  body('feesHistory.*.semester')
    .optional()
    .isString()
    .withMessage('Semester must be a string')
    .optional(),


  validateRequest
];
