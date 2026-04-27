import { NextResponse } from "next/server";

const requiredFields = ["fullName", "email", "serviceRequired", "message"];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim().length === 0) {
        return NextResponse.json(
          { ok: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const payload = {
      fullName: String(body.fullName).trim(),
      email: String(body.email).trim(),
      phone: String(body.phone || "").trim(),
      serviceRequired: String(body.serviceRequired).trim(),
      budget: String(body.budget || "").trim(),
      message: String(body.message).trim(),
      submittedAt: new Date().toISOString()
    };

    if (process.env.CONTACT_WEBHOOK_URL) {
      const response = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        return NextResponse.json(
          { ok: false, message: "Contact webhook failed" },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({
      ok: true,
      message: "Enquiry received",
      data: payload
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid contact request" },
      { status: 400 }
    );
  }
}
