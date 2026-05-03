import { Router } from "express";
import {
  authWithGoogle,
  deleteUser,
  googleCallback,
  login,
  register,
} from "../controllers/auth.controller";

const router = Router();

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// delete user
router.delete("/delete/:id", deleteUser);

// refresh token
router.post("/refresh");

// authenticate with google
router.get("/google", authWithGoogle);

// google callback
router.get("/google/callback", googleCallback);

export default router;
