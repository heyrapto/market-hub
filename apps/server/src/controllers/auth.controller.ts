import passport from "passport";
import { users } from "../config/db/schema";
import express from "express";

// register user
export const register = async (
  req: express.Request,
  res: express.Response,
) => {};

// login user
export const login = async (req: express.Request, res: express.Response) => {};

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
