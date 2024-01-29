import { env } from "@/env";
import type { EmailPayload } from "./types/email";
import nodemailer from "nodemailer";

const smtpOptions = {
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  // secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport({
  ...smtpOptions,
});

export const sendEmail = async (data: EmailPayload) => {
  return await transporter.sendMail({
    from: {
      name: "Analytix",
      address: env.SMTP_USER,
    },
    ...data,
  });
};
