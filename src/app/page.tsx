import { getSupabaseEnv } from "@/lib/supabase/env";

export default function Home() {
  const supabaseConfigured = getSupabaseEnv() !== null;

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24">
      <div className="flex max-w-xl flex-col gap-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">
          Instandt Reloaded
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Grundgerüst steht: Next.js, TypeScript, Tailwind, Supabase.
        </p>
      </div>

      <dl className="grid w-full max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-lg border border-zinc-200 p-6 text-sm dark:border-zinc-800">
        <dt className="font-medium">Supabase</dt>
        <dd>
          {supabaseConfigured ? (
            <span className="text-emerald-600 dark:text-emerald-400">
              konfiguriert
            </span>
          ) : (
            <span className="text-amber-600 dark:text-amber-400">
              nicht konfiguriert – siehe .env.example und README
            </span>
          )}
        </dd>
        <dt className="font-medium">Health-Check</dt>
        <dd>
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-900">
            GET /api/health
          </code>
        </dd>
      </dl>
    </main>
  );
}
