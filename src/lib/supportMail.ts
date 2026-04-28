import nodemailer from "nodemailer";
import { siteConfig } from "@/data/site";

export type SupportMailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type SupportEmailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string | { name: string; address: string };
  attachments?: SupportMailAttachment[];
};

type MailError = {
  code?: string;
  command?: string;
  response?: string;
  responseCode?: number;
  message?: string;
};

function getSupportEmail() {
  return process.env.SUPPORT_EMAIL || siteConfig.supportEmail;
}

export function getSupportInboxAddress() {
  return getSupportEmail();
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const secure = process.env.SMTP_SECURE !== "false";
  const supportEmail = getSupportEmail();
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

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const supportEmail = getSupportEmail();
  const from =
    process.env.RESEND_FROM ||
    process.env.SMTP_FROM ||
    `"${siteConfig.name} Support" <support@${siteConfig.domain}>`;

  if (!apiKey || !supportEmail || !from) {
    return null;
  }

  return {
    apiKey,
    supportEmail,
    from
  };
}

function formatReplyTo(replyTo?: SupportEmailMessage["replyTo"]) {
  if (!replyTo) {
    return undefined;
  }

  if (typeof replyTo === "string") {
    return replyTo;
  }

  return `"${replyTo.name}" <${replyTo.address}>`;
}

function createMailConfigError() {
  const error = new Error(
    "Support email is not configured. Add RESEND_API_KEY and RESEND_FROM, or configure Gmail SMTP."
  ) as Error & { code?: string };

  error.code = "MISSING_MAIL_CONFIG";
  return error;
}

async function sendWithResend(message: SupportEmailMessage) {
  const config = getResendConfig();

  if (!config) {
    throw createMailConfigError();
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.from,
      to: [message.to],
      subject: message.subject,
      text: message.text,
      html: message.html,
      reply_to: formatReplyTo(message.replyTo),
      attachments: message.attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content.toString("base64")
      }))
    })
  });

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(details || "Resend email request failed") as Error & {
      code?: string;
      responseCode?: number;
      response?: string;
    };

    error.code = "RESEND_ERROR";
    error.responseCode = response.status;
    error.response = details;
    throw error;
  }
}

async function sendWithSmtp(message: SupportEmailMessage) {
  const config = getSmtpConfig();

  if (!config) {
    throw createMailConfigError();
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth
  });

  await transporter.sendMail({
    from: config.from,
    to: message.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    html: message.html,
    attachments: message.attachments
  });
}

export function getSupportMailStatus() {
  return {
    hasResend: Boolean(process.env.RESEND_API_KEY && (process.env.RESEND_FROM || process.env.SMTP_FROM)),
    hasSmtp: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS),
    supportEmail: getSupportEmail()
  };
}

export async function sendSupportEmail(message: SupportEmailMessage) {
  if (process.env.RESEND_API_KEY) {
    await sendWithResend(message);
    return;
  }

  await sendWithSmtp(message);
}

export function getSupportMailErrorMessage(error: unknown) {
  const mailError = error as MailError;

  if (mailError.code === "MISSING_MAIL_CONFIG") {
    return "Support email is not configured. Add RESEND_API_KEY and RESEND_FROM, or configure Gmail SMTP environment variables.";
  }

  if (mailError.code === "RESEND_ERROR") {
    return "Resend could not send the email. Check RESEND_API_KEY, RESEND_FROM, and that your sending domain is verified.";
  }

  if (mailError.code === "EAUTH" || mailError.responseCode === 535) {
    return "Gmail rejected the SMTP login. Use a Google App Password for SMTP_PASS, or switch to Resend by setting RESEND_API_KEY and RESEND_FROM.";
  }

  if (mailError.code === "ECONNECTION" || mailError.code === "ETIMEDOUT") {
    return "The server could not connect to Gmail SMTP. Use Resend for production email, or check SMTP host, port, secure setting, and hosting firewall.";
  }

  if (mailError.code === "ENOTFOUND") {
    return "The server could not find the email provider host. Check SMTP_HOST or use Resend with RESEND_API_KEY.";
  }

  if (mailError.command === "CONN") {
    return "The SMTP connection failed. Use Resend for production email, or check Gmail SMTP settings.";
  }

  return "Unable to send email. Check support email provider environment variables.";
}
