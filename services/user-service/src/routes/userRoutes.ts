import { Router } from "express";
import { userController } from "../controllers/userControllers";

const router = Router();

router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);
router.put("/favorite", userController.addFavoriteCourse);

export const userRoutes = router;
