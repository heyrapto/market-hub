import passport from "passport";
import { users } from "../config/db/schema";
import express from "express";
import { db } from "../config/db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import bcrypt from "bcrypt";
import { env } from "../config/env";

// register user
export const register = async (req: express.Request, res: express.Response) => {
  const { firstName, lastName, email, password, role } = req.body;
  try {
    if (!firstName || !lastName || !password || !email) {
      res.status(400).json({ message: "Required missing field" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        firstName: firstName,
        lastName: lastName,
        role: role,
        password: hashedPassword,
        email: email,
      })
      .returning({
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
      });

    res.status(201).json({
      message: "User Created succesfully",
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    throw new AppError(error.message, 500);
  }
};

// login user
export const login = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({ message: "Required missing field" });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
    }

    const isMatch = bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      res
        .status(400)
        .json({ message: "Password is incorrect", success: false });
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_ACCESS_SECRET,
      { expiresIn: "1d" },
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" },
    );

    if (user) {
      const { password, ...userWithoutPassword } = user;

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "Login Succesfull",
        success: true,
        user: userWithoutPassword,
        accessToken,
      });
    }
  } catch (error: any) {
    throw new AppError(error.message, 500);
  }
};

// delete user
export const deleteUser = async (
  req: express.Request,
  res: express.Response,
) => {
  const { id } = req.params;
  try {
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    await db.delete(users).where(eq(users.id, id));

    res.status(200).json({ message: `User deleted succesfully` });
  } catch (error: any) {
    throw new AppError(error.message, 500);
  }
};

// refresh token
export const refreshToken = async (
  req: express.Request,
  res: express.Response,
) => {};

// google auth
export const authWithGoogle = async () => {
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  });
};

// callback route (think of it like a return address on an envelope: you send a request to a service, and you provide the callback route so the service knows exactly where to send the response or the user once it's done.)
export const googleCallback = async () => {
  (passport.authenticate("google", { failureRedirect: "/login" }),
    function (req: express.Request, res: express.Response) {
      console.log(req.user);
      req.session.save(() => {
        res.redirect("/");
      });
    });
};
