import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { tagRoutes } from "./routes/tagRoutes";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(tagRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Tag service running on port ${PORT}`));
