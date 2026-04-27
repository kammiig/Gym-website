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
