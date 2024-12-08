import { query } from 'express-validator';

const validateAnalyticsQuery = [
  query('viewType')
    .isIn(['monthly', 'yearly'])
    .withMessage('viewType must be "monthly" or "yearly"'),
  query('month')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be a number between 1 and 12'),
  query('year')
    .isInt({ min: 2000 })
    .withMessage('Year must be a valid number greater than or equal to 2000'),
];

export default validateAnalyticsQuery;
