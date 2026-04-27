import crypto from "crypto";

export const SUPPORT_SESSION_COOKIE = "ps_support_session";
export const SUPPORT_CHALLENGE_COOKIE = "ps_support_challenge";

export type SupportSession = {
  fullName: string;
  email: string;
  phone: string;
  expiresAt: number;
};

export type SupportChallenge = SupportSession & {
  codeHash: string;
};

export const sessionMaxAgeSeconds = 60 * 60 * 24 * 7;
export const challengeMaxAgeSeconds = 60 * 10;

function getSecret() {
  return (
    process.env.SUPPORT_AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "development-only-planetic-support-secret"
  );
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function encodeToken(payload: Record<string, unknown>) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);

  return `${body}.${signature}`;
}

export function decodeToken<T extends { expiresAt?: number }>(token?: string) {
  if (!token) {
    return null;
  }

  const [body, signature] = token.split(".");

  if (!body || !signature || sign(body) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as T;

    if (payload.expiresAt && payload.expiresAt < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function createLoginCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

export function hashLoginCode(email: string, code: string, expiresAt: number) {
  return crypto
    .createHash("sha256")
    .update(`${email.toLowerCase()}:${code}:${expiresAt}:${getSecret()}`)
    .digest("hex");
}

export function isProduction() {
  return process.env.NODE_ENV === "production";
}
