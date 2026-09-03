#!/bin/bash
# Installiert Abhängigkeiten beim Start einer Claude-Code-Web-Session,
# damit Lint, Typecheck und Tests sofort laufen.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo 'export NEXT_TELEMETRY_DISABLED=1' >> "${CLAUDE_ENV_FILE:-/dev/null}"

if [ -f package-lock.json ]; then
  npm install --no-audit --no-fund
fi
