import { Router } from "express";
import { courseController } from "../controllers/courseControllers";
import upload from "../middlewares/upload";
const router = Router();

router.post("/", upload.single("image"), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.put("/:id", courseController.updateCourseById);
router.delete("/:id", courseController.deleteCourse);

export const courseRoutes = router;
