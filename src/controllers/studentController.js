import { Student } from "../models/Student.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const studentController = {
  getAllStudents: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const sort = req.query.sort || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const students = await Student.find()
      .populate("class", "name year")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Student.countDocuments();

    res.json({
      students,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalStudents: total,
    });
  }),

  getStudentById: asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id).populate("class");

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    res.json(student);
  }),

  createStudent: asyncHandler(async (req, res) => {
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  }),

  updateStudent: asyncHandler(async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      throw new ApiError(404, "Student not found");
    }

    res.json(updatedStudent);
  }),

  deleteStudent: asyncHandler(async (req, res) => {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      throw new ApiError(404, "Student not found");
    }

    res.status(204).send();
  }),
};
