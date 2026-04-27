import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SUPPORT_CHALLENGE_COOKIE,
  challengeMaxAgeSeconds,
  createLoginCode,
  encodeToken,
  hashLoginCode,
  isProduction
} from "@/lib/supportAuth";
import { createSupportTransporter } from "@/lib/supportMail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = clean(body.fullName);
    const email = clean(body.email).toLowerCase();
    const phone = clean(body.phone);

    if (!fullName || !email) {
      return NextResponse.json(
        { ok: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    if (!isEmail(email)) {
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
            "Support login email is not configured yet. Add SMTP settings in your environment variables."
        },
        { status: 500 }
      );
    }

    const code = createLoginCode();
    const expiresAt = Date.now() + challengeMaxAgeSeconds * 1000;

    cookies().set(
      SUPPORT_CHALLENGE_COOKIE,
      encodeToken({
        fullName,
        email,
        phone,
        codeHash: hashLoginCode(email, code, expiresAt),
        expiresAt
      }),
      {
        httpOnly: true,
        maxAge: challengeMaxAgeSeconds,
        path: "/",
        sameSite: "lax",
        secure: isProduction()
      }
    );

    await mail.transporter.sendMail({
      from: mail.config.from,
      to: email,
      replyTo: mail.config.supportEmail,
      subject: "Your Planetic Solutions support login code",
      text: [
        `Hi ${fullName},`,
        "",
        `Your Planetic Solutions support login code is ${code}.`,
        "This code expires in 10 minutes.",
        "",
        "If you did not request this code, you can ignore this email."
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6;">
          <h2 style="margin:0 0 12px;">Support portal login</h2>
          <p>Hi ${escapeHtml(fullName)},</p>
          <p>Your Planetic Solutions support login code is:</p>
          <p style="font-size:28px;font-weight:700;letter-spacing:4px;margin:18px 0;">${escapeHtml(code)}</p>
          <p>This code expires in 10 minutes.</p>
        </div>
      `
    });

    return NextResponse.json({
      ok: true,
      message: "Login code sent"
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to send login code." },
      { status: 400 }
    );
  }
}
