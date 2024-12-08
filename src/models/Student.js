import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
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
      required: true,
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
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    feesPaid: {
      type: Number,
      default: 0,
    },
    feesHistory: [
      {
        amount: Number,
        date: Date,
        semester: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
