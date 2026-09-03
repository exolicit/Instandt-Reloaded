# Instandt Reloaded

Web-App auf Basis von **Next.js 16** (App Router, TypeScript, Tailwind) mit **Supabase** (Postgres, Auth, Storage).
Hosting-Ziel: **Vercel** (Region Frankfurt), Datenbank: **Supabase** (Region Frankfurt).

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Werte aus dem Supabase-Dashboard eintragen
npm run dev                  # http://localhost:3000
```

Die App läuft auch ohne Supabase-Konfiguration; die Startseite und `GET /api/health` zeigen dann „nicht konfiguriert“.

## Skripte

| Befehl              | Zweck                                   |
| ------------------- | --------------------------------------- |
| `npm run dev`       | Entwicklungsserver                      |
| `npm run lint`      | ESLint                                  |
| `npm run typecheck` | TypeScript ohne Emit                    |
| `npm run test`      | Vitest                                  |
| `npm run check`     | Lint + Typecheck + Test (wie CI)        |
| `npm run build`     | Produktions-Build                       |

## Projektstruktur

```
src/
  app/                 Routen (App Router)
    api/health/        Health-Endpoint
  lib/supabase/
    env.ts             Liest NEXT_PUBLIC_SUPABASE_* (null, wenn nicht gesetzt)
    client.ts          Browser-Client (Client Components)
    server.ts          Server-Client (Server Components, Actions, Route Handler)
    proxy.ts           Session-Refresh, wird aus src/proxy.ts aufgerufen
  proxy.ts             Next-16-Proxy (früher Middleware)
supabase/migrations/   SQL-Migrationen (0001: Profile mit RLS)
.github/workflows/     CI: Lint, Typecheck, Test, Build
.claude/               SessionStart-Hook für Claude Code im Web
```

## Cloud einrichten (einmalig, ~10 Minuten)

### 1. Supabase

1. Auf <https://supabase.com> ein neues Projekt anlegen, **Region: Frankfurt (eu-central-1)**.
2. Unter *Project Settings → API* die **Project URL** und den **Publishable Key** kopieren.
3. Im *SQL Editor* die Datei `supabase/migrations/0001_profiles.sql` ausführen
   (oder mit der Supabase-CLI: `supabase link` und `supabase db push`).

### 2. Vercel

1. Auf <https://vercel.com/new> das GitHub-Repo `exolicit/Instandt-Reloaded` importieren. Framework wird als Next.js erkannt.
2. Unter *Settings → Functions* die Region auf **Frankfurt (fra1)** stellen.
3. Unter *Settings → Environment Variables* eintragen (für Production **und** Preview):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

   Alternativ die Supabase-Integration aus dem Vercel-Marketplace nutzen; sie setzt die Variablen automatisch.
4. Fertig: Jeder Push auf `main` deployt nach Production, jeder Pull Request bekommt eine eigene Preview-URL.

### 3. Claude Code im Web

Der SessionStart-Hook unter `.claude/hooks/session-start.sh` installiert beim Start jeder Web-Session die Abhängigkeiten.
Cloud-Zugangsdaten werden **nicht** in der Session benötigt: Deployments laufen über die Git-Integration von Vercel.
Sollen aus der Session heraus Migrationen ausgeführt oder Logs gelesen werden, müssen im Claude-Code-Environment
`api.supabase.com` bzw. `api.vercel.com` in der Netzwerk-Policy freigegeben und passende Tokens als Secrets hinterlegt werden.
Niemals Produktions-Credentials oder den `SUPABASE_SERVICE_ROLE_KEY` in der Session hinterlegen.
