import { getSupabaseEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    status: "ok",
    supabaseConfigured: getSupabaseEnv() !== null,
    timestamp: new Date().toISOString(),
  });
}
