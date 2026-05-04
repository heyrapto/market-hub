import nodemailer from "nodemailer";
import { env } from "../config/env";
import { AppError } from "../utils/appError";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const mailOptions = {
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    };

    return transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Verification failed:", err);
    throw new AppError("Email could not be sent", 500);
  }
};
