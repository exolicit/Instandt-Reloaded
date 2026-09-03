/**
 * Liest die öffentliche Supabase-Konfiguration aus den Umgebungsvariablen.
 *
 * Gibt `null` zurück, wenn Supabase (noch) nicht konfiguriert ist. Dadurch
 * lässt sich die App bauen und starten, bevor ein Supabase-Projekt verbunden
 * ist (z. B. für erste Vercel-Preview-Deployments).
 *
 * Unterstützt sowohl den neuen `PUBLISHABLE_KEY` (sb_publishable_…) als auch
 * den älteren `ANON_KEY`, den die Vercel-Integration setzt.
 */
export type SupabaseEnv = {
  url: string;
  publishableKey: string;
};

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) {
    return null;
  }

  return { url, publishableKey };
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = getSupabaseEnv();
  if (!env) {
    throw new Error(
      "Supabase ist nicht konfiguriert. Bitte NEXT_PUBLIC_SUPABASE_URL und " +
        "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY setzen (siehe .env.example).",
    );
  }
  return env;
}
