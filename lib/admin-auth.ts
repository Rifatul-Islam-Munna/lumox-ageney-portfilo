import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "luumox_admin";

function secret() {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? "dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createAdminSession(email: string) {
  const value = `${email}.${Date.now()}`;
  const token = `${value}.${sign(value)}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}

export async function isAdminAuthed() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length < 3) return false;

  const signature = parts.pop() ?? "";
  const value = parts.join(".");
  const expected = sign(value);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isValidAdmin(email: string, password: string) {
  return email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD;
}
