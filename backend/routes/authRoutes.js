import express from "express";
import { login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, async (req, res) => {
  res.json({ user: req.user });
});

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

export default router;
