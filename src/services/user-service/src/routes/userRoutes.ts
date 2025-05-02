import { Router } from "express";
import { userController } from "../controllers/userControllers";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

router.get("/:id", authenticateJWT, userController.getUserById);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
