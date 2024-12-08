import { Teacher } from "../models/Teacher.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const teacherController = {
  getAllTeachers: asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const sort = req.query.sort || "name";
    const order = req.query.order === "desc" ? -1 : 1;

    const teachers = await Teacher.find()
      .populate("assignedClass", "name year")
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Teacher.countDocuments();

    res.json({
      teachers,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalTeachers: total,
    });
  }),

  getTeacherById: asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.params.id).populate(
      "assignedClass"
    );

    if (!teacher) {
      throw new ApiError(404, "Teacher not found");
    }

    res.json(teacher);
  }),

  createTeacher: asyncHandler(async (req, res) => {
    const newTeacher = await Teacher.create(req.body);
    res.status(201).json(newTeacher);
  }),

  updateTeacher: asyncHandler(async (req, res) => {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTeacher) {
      throw new ApiError(404, "Teacher not found");
    }

    res.json(updatedTeacher);
  }),

  deleteTeacher: asyncHandler(async (req, res) => {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);

    if (!deletedTeacher) {
      throw new ApiError(404, "Teacher not found");
    }

    res.status(204).send();
  }),
};
