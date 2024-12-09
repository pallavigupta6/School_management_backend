import { body } from "express-validator";
import { validateRequest } from "../validateRequest.js";

export const validateClass = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Class name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Class name must be between 2 and 50 characters"),

  body("year")
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Please provide a valid year"),

  // body("teacher")
  //   .optional()
  //   .isMongoId()
  //   .withMessage("Please provide a valid teacher ID"),
  body("teacher")
    .optional()
    .isMongoId()
    .withMessage("Please provide a valid teacher ID"),

  body("studentFees")
    .isFloat({ min: 0 })
    .withMessage("Student fees must be a positive number"),

  body("maxStudents")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Maximum students must be between 1 and 100"),

  validateRequest,
];


