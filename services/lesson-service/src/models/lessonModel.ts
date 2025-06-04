import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LessonSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String },
  videoUrl: { type: String },
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  order: { type: Number },
  createdAt: { type: Date, default: Date.now, required: true },
});

export const Lesson = model("Lesson", LessonSchema);
