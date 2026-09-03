@AGENTS.md

# Instandt Reloaded – Projektnotizen

- Stack: Next.js 16 (App Router, `src/`), TypeScript strict, Tailwind 4, Supabase (`@supabase/ssr`).
- Vor jedem Push: `npm run check` (Lint, Typecheck, Vitest) und `npm run build`.
- Supabase-Zugriff nur über `src/lib/supabase/*`; nie direkt `createClient` aus `@supabase/supabase-js` in Komponenten.
- Middleware heißt in Next 16 `proxy.ts` und liegt in `src/proxy.ts`.
- Keine Google Fonts, keine externen Runtime-Abhängigkeiten ohne Grund (DSGVO).
- Sprache in UI und Doku: Deutsch.
