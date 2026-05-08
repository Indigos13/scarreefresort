/**
 * Simple Auth — no library needed.
 * Credentials stored in env vars. Session via signed JWT cookie.
 */
import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";
const secret = () =>
  new TextEncoder().encode(
    process.env.BETTER_AUTH_SECRET || "fallback-secret-change-me"
  );

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret());
    return true;
  } catch {
    return false;
  }
}

export function validateCredentials(email: string, password: string): boolean {
  const validEmail = process.env.ADMIN_EMAIL || "admin@scarreefresort.com";
  const validPassword = process.env.ADMIN_PASSWORD || "admin123";
  return email === validEmail && password === validPassword;
}

export { SESSION_COOKIE };
