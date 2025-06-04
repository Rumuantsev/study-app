import { Router } from "express";
import { tagController } from "../controllers/tagController";

const router = Router();

router.post("/", tagController.createTag);
router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getTagById);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

export const tagRoutes = router;
