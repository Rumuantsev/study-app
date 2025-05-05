import { Router } from "express";
import { userController } from "../controllers/userControllers";
import { authenticateJWT } from "../middlewares/authMiddleware";

const router = Router();

router.get("/:id", authenticateJWT, userController.getUserById);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
