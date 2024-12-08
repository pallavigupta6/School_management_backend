import { body } from 'express-validator';
import { validateRequest } from '../validateRequest.js';

export const validateTeacher = [
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

  body('salary')
    .isFloat({ min: 0 })
    .withMessage('Salary must be a positive number')
    .optional(),

  body('subjects')
    .isArray()
    .withMessage('Subjects must be an array')
    .notEmpty()
    .withMessage('At least one subject is required')
    .optional(),

  body('subjects.*')
    .isString()
    .withMessage('Each subject must be a string')
    .optional(),

  body('assignedClass')
    .optional()
    .isMongoId()
    .withMessage('Please provide a valid class ID')
    .optional(),

  validateRequest
];