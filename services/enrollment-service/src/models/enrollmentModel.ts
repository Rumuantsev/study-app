import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EnrollmentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],
  createdAt: { type: Date, default: Date.now, required: true },
  progress: { type: Number, default: 0, required: true },
});

export const Enrollment = model("Enrollment", EnrollmentSchema);
