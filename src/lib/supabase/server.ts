import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { requireSupabaseEnv } from "./env";

/**
 * Supabase-Client für Server Components, Server Actions und Route Handler.
 * Liest und schreibt die Auth-Session über die Next.js-Cookies.
 */
export async function createClient() {
  const { url, publishableKey } = requireSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // In Server Components dürfen keine Cookies gesetzt werden.
          // Das Session-Refresh übernimmt in diesem Fall src/proxy.ts.
        }
      },
    },
  });
}
