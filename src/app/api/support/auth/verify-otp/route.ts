import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SUPPORT_CHALLENGE_COOKIE,
  SUPPORT_SESSION_COOKIE,
  SupportChallenge,
  decodeToken,
  encodeToken,
  hashLoginCode,
  isProduction,
  sessionMaxAgeSeconds
} from "@/lib/supportAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function clean(value: unknown) {
  return String(value || "").trim();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const code = clean(body.code);
    const challenge = decodeToken<SupportChallenge>(
      cookies().get(SUPPORT_CHALLENGE_COOKIE)?.value
    );

    if (!challenge || !code) {
      return NextResponse.json(
        { ok: false, message: "Login code expired. Request a new code." },
        { status: 400 }
      );
    }

    const expected = hashLoginCode(challenge.email, code, challenge.expiresAt);

    if (expected !== challenge.codeHash) {
      return NextResponse.json(
        { ok: false, message: "Incorrect login code." },
        { status: 400 }
      );
    }

    const session = {
      fullName: challenge.fullName,
      email: challenge.email,
      phone: challenge.phone,
      expiresAt: Date.now() + sessionMaxAgeSeconds * 1000
    };

    cookies().set(SUPPORT_SESSION_COOKIE, encodeToken(session), {
      httpOnly: true,
      maxAge: sessionMaxAgeSeconds,
      path: "/",
      sameSite: "lax",
      secure: isProduction()
    });

    cookies().set(SUPPORT_CHALLENGE_COOKIE, "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: isProduction()
    });

    return NextResponse.json({
      ok: true,
      user: {
        fullName: session.fullName,
        email: session.email,
        phone: session.phone
      }
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to verify login code." },
      { status: 400 }
    );
  }
}
