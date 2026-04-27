import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SUPPORT_SESSION_COOKIE, SupportSession, decodeToken } from "@/lib/supportAuth";
import { SupportMailAttachment, createSupportTransporter } from "@/lib/supportMail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const requiredFields = ["department", "priority", "subject", "message"];
const allowedAttachmentTypes = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/zip",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword"
]);
const maxFiles = 5;
const maxFileSize = 5 * 1024 * 1024;
const maxTotalSize = 15 * 1024 * 1024;

type TicketPayload = {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  priority: string;
  serviceReference: string;
  subject: string;
  message: string;
  attachmentNames: string[];
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

function buildAdminEmail(ticketId: string, payload: TicketPayload) {
  const fields = [
    ["Ticket ID", ticketId],
    ["Customer", payload.fullName],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not provided"],
    ["Department", payload.department],
    ["Priority", payload.priority],
    ["Service reference", payload.serviceReference || "Not provided"],
    ["Attachments", payload.attachmentNames.length ? payload.attachmentNames.join(", ") : "None"],
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
    "Reply to this email to respond directly to the customer.",
    payload.attachmentNames.length ? `Attachments: ${payload.attachmentNames.join(", ")}` : ""
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
    payload.serviceReference ? `Service reference: ${payload.serviceReference}` : "",
    "",
    "We have received your message and will reply by email."
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;">
      <h2 style="margin:0 0 12px;">Support ticket created</h2>
      <p>Hi ${escapeHtml(payload.fullName)},</p>
      <p>Your support ticket has been created with Planetic Solutions.</p>
      <p><strong>Ticket ID:</strong> ${escapeHtml(ticketId)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
      <p><strong>Priority:</strong> ${escapeHtml(payload.priority)}</p>
      ${
        payload.serviceReference
          ? `<p><strong>Service reference:</strong> ${escapeHtml(payload.serviceReference)}</p>`
          : ""
      }
      <p>We have received your message and will reply by email.</p>
    </div>
  `;

  return { text, html };
}

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? clean(value) : "";
}

async function prepareAttachments(formData: FormData) {
  const files = formData
    .getAll("attachments")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (files.length > maxFiles) {
    throw new Error(`Upload up to ${maxFiles} attachments only.`);
  }

  const totalSize = files.reduce((total, file) => total + file.size, 0);

  if (totalSize > maxTotalSize) {
    throw new Error("Total attachment size must be 15 MB or less.");
  }

  const attachments: SupportMailAttachment[] = [];

  for (const file of files) {
    if (file.size > maxFileSize) {
      throw new Error(`${file.name} is too large. Each attachment must be 5 MB or less.`);
    }

    if (file.type && !allowedAttachmentTypes.has(file.type)) {
      throw new Error(`${file.name} is not an allowed attachment type.`);
    }

    attachments.push({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined
    });
  }

  return attachments;
}

export async function POST(request: Request) {
  try {
    const session = decodeToken<SupportSession>(cookies().get(SUPPORT_SESSION_COOKIE)?.value);

    if (!session) {
      return NextResponse.json(
        { ok: false, message: "Please login before creating a support ticket." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    for (const field of requiredFields) {
      if (!getFormValue(formData, field)) {
        return NextResponse.json(
          { ok: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const attachments = await prepareAttachments(formData);
    const payload: TicketPayload = {
      fullName: session.fullName,
      email: session.email,
      phone: session.phone,
      department: getFormValue(formData, "department"),
      priority: getFormValue(formData, "priority"),
      serviceReference: getFormValue(formData, "serviceReference"),
      subject: getFormValue(formData, "subject"),
      message: getFormValue(formData, "message"),
      attachmentNames: attachments.map((attachment) => attachment.filename)
    };

    if (!isEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const mail = createSupportTransporter();

    if (!mail) {
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
    const adminEmail = buildAdminEmail(ticketId, payload);
    const customerEmail = buildCustomerEmail(ticketId, payload);

    await mail.transporter.sendMail({
      from: mail.config.from,
      to: mail.config.supportEmail,
      replyTo: {
        name: payload.fullName,
        address: payload.email
      },
      subject: `[${ticketId}] ${payload.subject}`,
      text: adminEmail.text,
      html: adminEmail.html,
      attachments
    });

    await mail.transporter.sendMail({
      from: mail.config.from,
      to: payload.email,
      replyTo: mail.config.supportEmail,
      subject: `Ticket received: ${ticketId}`,
      text: customerEmail.text,
      html: customerEmail.html
    });

    return NextResponse.json({
      ok: true,
      ticketId,
      message: "Support ticket created"
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message:
          error instanceof Error ? error.message : "Unable to create support ticket."
      },
      { status: 400 }
    );
  }
}
