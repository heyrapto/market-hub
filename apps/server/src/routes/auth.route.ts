import { Router } from "express";
import { authWithGoogle, googleCallback } from "../controllers/auth.controller";

const router = Router();

// register user

// login user

// authenticate with google
router.get("/google", authWithGoogle);

// google callback
router.get("/google/callback", googleCallback);

export default router;
