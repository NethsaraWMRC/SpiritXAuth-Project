import express from "express";
import {
  register,
  login,
  getRefreshToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-refreshToken", getRefreshToken);
export default router;
