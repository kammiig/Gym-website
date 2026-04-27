import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requiredFields = ["fullName", "email", "department", "priority", "subject", "message"];

type TicketPayload = {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  priority: string;
  subject: string;
  message: string;
};

function clean(value: unknown) {
  return String(value || "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateTicketId() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();

  return `PS-${date}-${random}`;
}

function getMailConfig() {
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

function buildAdminEmail(ticketId: string, payload: TicketPayload) {
  const fields = [
    ["Ticket ID", ticketId],
    ["Customer", payload.fullName],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Department", payload.department],
    ["Priority", payload.priority],
    ["Subject", payload.subject]
  ];

  const text = [
    `New support ticket: ${ticketId}`,
    "",
    ...fields.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message,
    "",
    "Reply to this email to respond directly to the customer."
  ].join("\n");

  const htmlRows = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #dbe4f0;">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #dbe4f0;">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;">
      <h2 style="margin:0 0 12px;">New support ticket: ${escapeHtml(ticketId)}</h2>
      <p style="margin:0 0 18px;">Reply to this email to respond directly to the customer.</p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:680px;border:1px solid #dbe4f0;">
        ${htmlRows}
      </table>
      <h3 style="margin:22px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;margin:0;padding:14px;background:#f6f8fc;border:1px solid #dbe4f0;">${escapeHtml(payload.message)}</p>
    </div>
  `;

  return { text, html };
}

function buildCustomerEmail(ticketId: string, payload: TicketPayload) {
  const text = [
    `Hi ${payload.fullName},`,
    "",
    `Your support ticket has been created with Planetic Solutions.`,
    "",
    `Ticket ID: ${ticketId}`,
    `Subject: ${payload.subject}`,
    `Priority: ${payload.priority}`,
    "",
    "We have received your message and will reply by email."
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;">
      <h2 style="margin:0 0 12px;">Support ticket created</h2>
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Your support ticket has been created with Planetic Solutions.</p>
      <p><strong>Ticket ID:</strong> ${escapeHtml(ticketId)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Priority:</strong> ${escapeHtml(payload.priority)}</p>
      <p>We have received your message and will reply by email.</p>
    </div>
  `;

  return { text, html };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    for (const field of requiredFields) {
      if (!clean(body[field])) {
        return NextResponse.json(
          { ok: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const payload: TicketPayload = {
      fullName: clean(body.fullName),
      email: clean(body.email),
      phone: clean(body.phone),
      department: clean(body.department),
      priority: clean(body.priority),
      subject: clean(body.subject),
      message: clean(body.message)
    };

    if (!isEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const config = getMailConfig();

    if (!config) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Support email is not configured yet. Add SMTP settings in your environment variables."
        },
        { status: 500 }
      );
    }

    const ticketId = generateTicketId();
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth
    });
    const adminEmail = buildAdminEmail(ticketId, payload);
    const customerEmail = buildCustomerEmail(ticketId, payload);

    await transporter.sendMail({
      from: config.from,
      to: config.supportEmail,
      replyTo: {
        name: payload.fullName,
        address: payload.email
      },
      subject: `[${ticketId}] ${payload.subject}`,
      text: adminEmail.text,
      html: adminEmail.html
    });

    await transporter.sendMail({
      from: config.from,
      to: payload.email,
      replyTo: config.supportEmail,
      subject: `Ticket received: ${ticketId}`,
      text: customerEmail.text,
      html: customerEmail.html
    });

    return NextResponse.json({
      ok: true,
      ticketId,
      message: "Support ticket created"
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to create support ticket." },
      { status: 400 }
    );
  }
}
