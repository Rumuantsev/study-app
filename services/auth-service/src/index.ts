import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { authRoutes } from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
