import express, { Request, Response } from "express";
import { publishToQueue } from "./../utils/rabbitmq";

const router = express.Router();

router.post("/enroll", async (req: Request, res: Response) => {
  try {
    const { userId, courseId } = req.body;

    if (!userId || !courseId) {
      res.status(400).json({ message: "Missing userId or courseId" });
      return;
    }

    await publishToQueue({ courseId, userId });

    res.status(200).json({ message: "Enrollment request received" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export const enrollmentRoutes = router;
