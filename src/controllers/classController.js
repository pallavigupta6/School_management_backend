import { Class } from "../models/Class.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const classController = {
  getAllClasses: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const sort = req.query.sort || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const classes = await Class.find()
      .populate("teacher", "name")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Class.countDocuments();

    res.json({
      classes,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalClasses: total,
    });
  }),

  // Get class by ID with analytics
  getClassById: asyncHandler(async (req, res) => {
    const classData = await Class.findById(req.params.id)
      .populate("teacher")
      .populate("students");

    if (!classData) {
      throw new ApiError(404, "Class not found");
    }

    // Calculate gender distribution
    const genderDistribution = {
      male: classData.students.filter((student) => student.gender === "male")
        .length,
      female: classData.students.filter(
        (student) => student.gender === "female"
      ).length,
      other: classData.students.filter((student) => student.gender === "other")
        .length,
    };

    res.json({
      class: classData,
      analytics: {
        totalStudents: classData.students.length,
        genderDistribution,
      },
    });
  }),

  // Create new class
  createClass: asyncHandler(async (req, res) => {
    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  }),

  // Update class
  updateClass: asyncHandler(async (req, res) => {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedClass) {
      throw new ApiError(404, "Class not found");
    }

    res.json(updatedClass);
  }),

  // Delete class
  deleteClass: asyncHandler(async (req, res) => {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);

    if (!deletedClass) {
      throw new ApiError(404, "Class not found");
    }

    res.status(204).send();
  }),
};
