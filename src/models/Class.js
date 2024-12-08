import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
      // default: null,
    },
    studentFees: {
      type: Number,
      required: true,
    },
    maxStudents: {
      type: Number,
      required: true,
      default: 30,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware to prevent exceeding max students
classSchema.pre("save", function (next) {
  if (this.students.length > this.maxStudents) {
    next(
      new Error(`Cannot exceed maximum student limit of ${this.maxStudents}`)
    );
  }
  next();
});

export const Class = mongoose.model("Class", classSchema);
