import { Router } from "express";
import { userController } from "../controllers/userControllers";

const router = Router();

router.post("/signup", userController.signup);
// router.post("/signin", userController.signin);

router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
