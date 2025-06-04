import { Router } from "express";
import { commentController } from "../controllers/commentController";

const router = Router();

router.post("/", commentController.createComment);
router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.put("/:id", commentController.updateComment);
router.delete("/:id", commentController.deleteComment);

export const commentRoutes = router;
