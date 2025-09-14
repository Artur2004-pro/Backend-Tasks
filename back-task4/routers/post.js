import express from "express";
import postController from "../controllers/postController.js";
const router = express.Router();

router.get("/", postController.all);
router.get("/:id", postController.postById);
router.post("/:id/comment", postController.addComment);

export default router;