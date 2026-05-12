import passport from "passport";
import { users } from "../config/db/schema";
import express from "express";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import { sendEmail } from "../services/email.service";
import { sendLoginEmail } from "../templates/welcome.template";

export const register = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!firstName || !lastName || !password || !email) {
      return res.status(400).json({ message: "Required missing field" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        firstName,
        lastName,
        role,
        password: hashedPassword,
        email,
      })
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        email: users.email,
      });

    const accessToken = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: newUser.id },
      env.JWT_REFRESH_SECRET,
      { expiresIn: "15d" }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    await sendEmail(
      newUser.email,
      "Signup Successful",
      sendLoginEmail(newUser)
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
      accessToken,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Required missing field" });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
        success: false,
      });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      env.JWT_REFRESH_SECRET,
      { expiresIn: "15d" }
    );

    const { password: _, ...userWithoutPassword } = user;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    await sendEmail(
      user.email,
      "Login Successful",
      sendLoginEmail(user)
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// refresh token
export const refreshToken = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    if (req.user?.role) {
      const newRefreshToken = jwt.sign(
        { id: req.user.id, role: req.user.role },
        env.JWT_REFRESH_SECRET,
        { expiresIn: "15d" },
      );

      res.status(201).send({
        success: true,
        message: "Refresh token created.",
        refreshToken: newRefreshToken,
        user: {
          id: req.user.id,
          firstName: req.user.firstName,
          lastName: req.user.firstName,
          email: req.user.email,
          role: req.user.role,
        },
      });
    }
  } catch (error) {
    throw new AppError(`${(error as Error).message}}`, 500);
  }
};


export const authWithGoogle = passport.authenticate("google", {
  scope: ["email", "profile"],
});


export const googleCallback = [
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    session: false,
  }),

  (req: express.Request, res: express.Response) => {
    const user = req.user as any;

    if (!user) {
      return res.redirect("http://localhost:3000/login");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" }
    );

    return res.redirect(
      `http://localhost:3000?token=${token}`
    );
  },
];


export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    throw new AppError((error as Error).message, 500);
  }
};


export const deleteUser = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;

  try {
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    await db.delete(users).where(eq(users.id, id));

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    throw new AppError((error as Error).message, 500);
  }
};