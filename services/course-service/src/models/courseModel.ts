import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const CourseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner",
    required: true,
  },
  published: { type: Boolean, default: false },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

CourseSchema.pre("validate", function (next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Course = model("Course", CourseSchema);
