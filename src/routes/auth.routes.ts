import express from "express";
import { login } from "../controllers/auth.controller";
import { validateLogin } from "../middleware/validation.middleware";

const router = express.Router();

router.post("/login", validateLogin, login);

export default router;
