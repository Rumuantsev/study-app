import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { userRoutes } from "./routes/userRoutes";
dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
