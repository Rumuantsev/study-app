import { Router } from "express";
import { lessonController } from "../controllers/lessonController";

const router = Router();

router.post("/", lessonController.createLesson);
router.get("/", lessonController.getAllLessons);
router.get("/:id", lessonController.getLessonById);
router.put("/:id", lessonController.updateLesson);
router.delete("/:id", lessonController.deleteLesson);

export const lessonRoutes = router;
