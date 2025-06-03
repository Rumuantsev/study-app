import mongoose from "mongoose";
import slugify from "slugify";

const { Schema, model } = mongoose;

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

TagSchema.pre("validate", function (next) {
  if (this.name && !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Tag = model("Tag", TagSchema);
