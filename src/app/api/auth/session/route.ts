import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ user: null });
  }

  const email = process.env.ADMIN_EMAIL || "admin@scarreefresort.com";
  return NextResponse.json({
    user: { name: "Admin", email },
  });
}
