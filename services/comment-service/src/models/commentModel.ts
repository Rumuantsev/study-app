import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  lessonId: { type: Schema.Types.ObjectId, ref: "Lesson", required: true },
  text: { type: String, required: true, maxlength: 255 },
});

export const Comment = model("Comment", CommentSchema);
