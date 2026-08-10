import { NextResponse } from "next/server";
import { createSession } from "../../../lib/session";

export async function POST(request) {
  const { password } = await request.json();
  const expected = process.env.COURSE_ACCESS_PASSWORD || "creditpulse";
  if (password !== expected) return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set("cp_course_access", await createSession("course1", 24), {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/",
  });
  return response;
}
