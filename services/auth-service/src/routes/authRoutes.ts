import { Router } from "express";
import { authController } from "../controllers/authControllers";

const router = Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

export const authRoutes = router;
