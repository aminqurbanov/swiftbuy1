import { createHmac } from "crypto";

/** HttpOnly cookie adı — server tərəfdə yoxlanır */
export const ADMIN_SESSION_COOKIE = "sb_admin_sess";

/** ADMIN_SECRET ilə deterministik sessiya dəyəri (paylaşılmır) */
export function adminSessionToken(secret: string): string {
  return createHmac("sha256", "swiftbuy-admin-v1")
    .update(secret)
    .digest("hex");
}
