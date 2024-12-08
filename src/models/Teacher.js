import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: false,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    assignedClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  {
    timestamps: true,
  }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
