import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { enrollmentRoutes } from "./routes/enrollmentRoutes";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(enrollmentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`));
