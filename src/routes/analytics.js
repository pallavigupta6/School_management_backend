import express from "express";
import { Teacher } from "../models/Teacher.js";
import { Student } from "../models/Student.js";
import { Class } from "../models/Class.js";

import { validationResult } from "express-validator";
import validateAnalyticsQuery from "../middleware/validators/analyticsValidator.js";

const router = express.Router();

// API to get the analytics for teacher salaries and student fees
router.get("/", validateAnalyticsQuery, async (req, res) => {
  // Validate query parameters
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { viewType, month, year } = req.query;
    let startDate, endDate;

    if (viewType === "monthly") {
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (viewType === "yearly") {
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 12, 0);
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid viewType. Use "monthly" or "yearly".' });
    }

    // Calculate total salary expenses (sum of teacher salaries)

    const totalSalaryExpense = await Teacher.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);

    // Calculate total income from paid students' fees
    const totalIncome = await Student.aggregate([
      { $match: { "feesHistory.date": { $gte: startDate, $lte: endDate } } },
      { $unwind: "$feesHistory" },
      { $match: { "feesHistory.date": { $gte: startDate, $lte: endDate } } },
      { $group: { _id: null, totalIncome: { $sum: "$feesHistory.amount" } } },
    ]);

    // Calculate total number of students
    const totalStudents = await Student.countDocuments();

    // Calculate total number of classes
    const totalClasses = await Class.countDocuments();

    // Calculate total number of teachers
    const totalTeachers = await Teacher.countDocuments();

    // Calculate total revenue (sum of all fees from students)
    const totalRevenue = totalIncome[0] ? totalIncome[0].totalIncome : 0;

    res.json({
      totalSalaryExpense: totalSalaryExpense[0]
        ? totalSalaryExpense[0].totalSalary
        : 0,
      //   totalIncome: totalIncome[0] ? totalIncome[0].totalIncome : 0,
      totalIncome: totalRevenue,
      totalStudents,
      totalClasses,
      totalTeachers,
      totalRevenue,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
