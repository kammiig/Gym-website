import nodemailer from "nodemailer";
import { siteConfig } from "@/data/site";

export type SupportMailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export function getSupportMailConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE !== "false";
  const supportEmail = process.env.SUPPORT_EMAIL || siteConfig.supportEmail;
  const from = process.env.SMTP_FROM || `"${siteConfig.name} Support" <${user}>`;

  if (!host || !user || !pass || !supportEmail) {
    return null;
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass
    },
    supportEmail,
    from
  };
}

export function createSupportTransporter() {
  const config = getSupportMailConfig();

  if (!config) {
    return null;
  }

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth
    })
  };
}

type MailError = {
  code?: string;
  command?: string;
  response?: string;
  responseCode?: number;
  message?: string;
};

export function getSupportMailErrorMessage(error: unknown) {
  const mailError = error as MailError;

  if (mailError.code === "EAUTH" || mailError.responseCode === 535) {
    return "Gmail rejected the SMTP login. Use a Google App Password for SMTP_PASS and make sure SMTP_USER is the same Gmail account.";
  }

  if (mailError.code === "ECONNECTION" || mailError.code === "ETIMEDOUT") {
    return "The server could not connect to Gmail SMTP. Check SMTP_HOST, SMTP_PORT, SMTP_SECURE, and hosting firewall settings.";
  }

  if (mailError.code === "ENOTFOUND") {
    return "The server could not find the SMTP host. Check SMTP_HOST is set to smtp.gmail.com.";
  }

  if (mailError.command === "CONN") {
    return "The SMTP connection failed. For Gmail use SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, and SMTP_SECURE=true.";
  }

  return "Unable to send login code. Check SMTP environment variables and Gmail App Password settings.";
}
