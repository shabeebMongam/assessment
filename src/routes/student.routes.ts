import express from "express";
import {
  getMyTasks,
  updateTaskStatus,
  getTaskById,
} from "../controllers/student.controller";
import { authenticate, authorizeStudent } from "../middleware/auth.middleware";

const router = express.Router();

// All student routes require authentication and student role
router.use(authenticate, authorizeStudent);

router.get("/tasks", getMyTasks);
router.get("/tasks/:taskId", getTaskById);
router.patch("/tasks/:taskId/status", updateTaskStatus);

export default router;
