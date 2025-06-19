import { Router } from "express";
import { enrollmentController } from "../controllers/enrollmentController";

const router = Router();

router.post("/", enrollmentController.enrollToCourse);
router.put("/complete", enrollmentController.completeLesson);
router.put("/uncomplete", enrollmentController.uncompleteLesson);
router.get("/count/:courseId", enrollmentController.getEnrollmentCount);

export const enrollmentRoutes = router;
