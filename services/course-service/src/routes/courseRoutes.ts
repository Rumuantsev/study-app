import { Router } from "express";
import { courseController } from "../controllers/courseControllers";
import upload from "../middlewares/upload";
const router = Router();

router.post("/create", upload.single("image"), courseController.createCourse);

export const courseRoutes = router;
