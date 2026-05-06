import { Router } from "express";
import {
  authWithGoogle,
  deleteUser,
  googleCallback,
  login,
  refreshToken,
  register,
} from "../controllers/auth.controller";
import { authMiddleware, authorizeAdmin } from "../middleware/auth.middlware";

const router = Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// delete user
router.delete("/delete/:id", authorizeAdmin, deleteUser);

// refresh token
router.post("/refresh", authMiddleware, refreshToken);

// authenticate with google
router.get("/google", authWithGoogle);

// google callback
router.get("/google/callback", googleCallback);

export default router;
