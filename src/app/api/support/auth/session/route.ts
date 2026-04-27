import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  SUPPORT_CHALLENGE_COOKIE,
  SUPPORT_SESSION_COOKIE,
  SupportSession,
  decodeToken,
  isProduction
} from "@/lib/supportAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = decodeToken<SupportSession>(cookies().get(SUPPORT_SESSION_COOKIE)?.value);

  if (!session) {
    return NextResponse.json({
      authenticated: false
    });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      fullName: session.fullName,
      email: session.email,
      phone: session.phone
    }
  });
}

export async function DELETE() {
  cookies().set(SUPPORT_SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
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
    ok: true
  });
}
