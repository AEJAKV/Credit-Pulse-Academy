import { NextResponse } from "next/server";
import { createSession } from "../../../../lib/session";

export async function POST(request) {
  const { email, password } = await request.json();
  const expectedEmail = process.env.ADMIN_EMAIL || "owner@creditpulse.ca";
  const expectedPassword = process.env.ADMIN_PASSWORD || "adminpulse";
  if (email !== expectedEmail || password !== expectedPassword) return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("cp_admin", await createSession("admin", 12), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/",
  });
  return response;
}
