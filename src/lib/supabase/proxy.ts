import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "./env";

/**
 * Erneuert abgelaufene Auth-Tokens und schreibt sie in Request und Response.
 * Wird aus src/proxy.ts aufgerufen. Ohne Supabase-Konfiguration reicht die
 * Anfrage unverändert durch.
 */
export async function updateSession(request: NextRequest) {
  const env = getSupabaseEnv();
  if (!env) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Wichtig: getUser() validiert das Token serverseitig und löst den Refresh aus.
  await supabase.auth.getUser();

  return response;
}
