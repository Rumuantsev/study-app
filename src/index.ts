import express from "express";
import mongoose from "mongoose";
// import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI!;
mongoose.connect(mongoUri);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  login: String,
  password: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

app.post("/user", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id, "-password");
  res.json(user).status(200);
});

app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" }).status(200);
});

app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
