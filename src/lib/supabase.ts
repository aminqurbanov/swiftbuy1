import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isMockPrototypeMode } from "@/lib/config";

/** Server-side only: secret key (Vercel: SUPABASE_SECRET_KEY or legacy SERVICE_ROLE) */
function getServiceRoleKey(): string | undefined {
  return (
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

let client: SupabaseClient | null = null;

/** Returns null if mock mode, URL/key missing — allows prototype without DB. */
export function getSupabaseServer(): SupabaseClient | null {
  if (isMockPrototypeMode()) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = getServiceRoleKey();
  if (!url || !key || url.includes("your-project")) return null;
  if (!client) {
    client = createClient(url, key);
  }
  return client;
}
