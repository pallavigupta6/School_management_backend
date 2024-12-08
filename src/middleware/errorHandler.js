import { ApiError } from '../utils/ApiError.js';

export const errorHandler = (err, req, res, next) => {
  // If err is not an instance of ApiError, convert it
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || 500;
    err = new ApiError(statusCode, err.message || 'Internal Server Error');
  }

  const response = {
    status: err.status,
    message: err.message,
    errors: err.errors,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };

  res.status(err.statusCode).json(response);
};