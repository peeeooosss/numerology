import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { getNumerologyCoachId } from "@/lib/tenant";

const USER_COOKIE = "magic_user_session";
const ADMIN_COOKIE = "magic_admin_session";
const SESSION_DAYS = 30;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, expectedHex] = storedHash.split(":");
  if (!salt || !expectedHex) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function generateTemporaryPassword() {
  return randomBytes(10).toString("base64url");
}

async function createSession(input: { userAccountId?: string; adminUserId?: string }) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await db.authSession.create({ data: { tokenHash: hashToken(token), expiresAt, ...input } });
  const cookieName = input.adminUserId ? ADMIN_COOKIE : USER_COOKIE;
  cookies().set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function createUserSession(userAccountId: string) {
  await createSession({ userAccountId });
}

export async function createAdminSession(adminUserId: string) {
  await createSession({ adminUserId });
}

async function getSessionToken(cookieName: string) {
  return cookies().get(cookieName)?.value;
}

export async function getCurrentUser() {
  const token = await getSessionToken(USER_COOKIE);
  if (!token) return null;
  const session = await db.authSession.findUnique({ where: { tokenHash: hashToken(token) }, include: { userAccount: { include: { client: true } } } });
  if (!session?.userAccount || session.expiresAt <= new Date() || session.userAccount.status !== "active") return null;
  await db.authSession.update({ where: { id: session.id }, data: { lastUsedAt: new Date() } });
  return { session, account: session.userAccount, client: session.userAccount.client };
}

export async function getCurrentAdmin() {
  const token = await getSessionToken(ADMIN_COOKIE);
  if (!token) return null;
  const session = await db.authSession.findUnique({ where: { tokenHash: hashToken(token) }, include: { adminUser: true } });
  if (!session?.adminUser || session.expiresAt <= new Date()) return null;
  await db.authSession.update({ where: { id: session.id }, data: { lastUsedAt: new Date() } });
  return { session, admin: session.adminUser };
}

export async function clearUserSession() {
  const token = await getSessionToken(USER_COOKIE);
  if (token) await db.authSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  cookies().set(USER_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}

export async function clearAdminSession() {
  const token = await getSessionToken(ADMIN_COOKIE);
  if (token) await db.authSession.deleteMany({ where: { tokenHash: hashToken(token) } });
  cookies().set(ADMIN_COOKIE, "", { httpOnly: true, expires: new Date(0), path: "/" });
}

export async function ensureAdminAccount() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured");
  const coachId = await getNumerologyCoachId();
  const existing = await db.adminUser.findUnique({ where: { email } });
  if (existing) return existing;
  return db.adminUser.create({ data: { id: randomBytes(16).toString("hex"), email, passwordHash: hashPassword(password), coachId } });
}

export function normalizeUsername(value: string) {
  return value.trim().toLowerCase();
}
