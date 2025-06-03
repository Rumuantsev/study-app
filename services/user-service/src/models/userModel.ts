import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  favoriteCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const User = model("User", UserSchema);
export default User;
