import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { courseRoutes } from "./routes/courseRoutes";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(courseRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Course service running on port ${PORT}`));
