import { Router } from "express";
import { userController } from "../controllers/userControllers";

const router = Router();

router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
