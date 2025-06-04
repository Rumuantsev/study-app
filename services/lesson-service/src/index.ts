import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { lessonRoutes } from "./routes/lessonRoutes";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(lessonRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Lesson service running on port ${PORT}`));
