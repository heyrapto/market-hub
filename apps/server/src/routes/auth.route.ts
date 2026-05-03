import { Router } from "express";
import {
  authWithGoogle,
  googleCallback,
  login,
  register,
} from "../controllers/auth.controller";

const router = Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// authenticate with google
router.get("/google", authWithGoogle);

// google callback
router.get("/google/callback", googleCallback);

export default router;
