import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/dataBase";
import { enrollmentRoutes } from "./routes/enrollmentRoutes";
import { startConsumer } from "./utils/rabbitmq";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

startConsumer();

app.use(enrollmentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Enrollment service running on port ${PORT}`)
);
