import express from "express";
import addController from "../controllers/addController.js"

const router = express.Router();

router.post("/", addController.add);
router.get("/", addController.viewAdd);

export default router;