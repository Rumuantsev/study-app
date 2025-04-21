import mongoose from "mongoose";

const connectDB = async (retryCount = 0) => {
  const maxRetries = 5;
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    if (retryCount < maxRetries) {
      setTimeout(() => connectDB(retryCount + 1), 5000);
    }
    process.exit(1);
  }
};

export { connectDB };
