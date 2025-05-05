import express from "express";
// import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import User from "../src/models/userModel";
import { userRoutes } from "./routes/userRoutes";
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => console.log("Server running on port 3000"));
