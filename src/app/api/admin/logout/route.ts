import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/adminAuth";

export async function POST(): Promise<NextResponse> {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return res;
}
