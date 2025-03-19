import express from "express";
import {
  addStudent,
  getAllStudents,
  assignTask,
  getAllTasks,
  getTaskById,
} from "../controllers/admin.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate, authorizeAdmin);

router.post("/students", addStudent);
router.get("/students", getAllStudents);
router.post("/tasks", assignTask);
router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);

export default router;
