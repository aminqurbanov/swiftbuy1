import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionToken,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const secret = process.env.ADMIN_SECRET;
  if (!secret || body.password !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const token = adminSessionToken(secret);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
