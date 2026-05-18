#!/bin/bash
set -e

# Remove packageManager field if present (breaks Replit's pnpm version)
node -e "
  const fs = require('fs');
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  delete pkg.packageManager;
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

pnpm install --frozen-lockfile=false

# Ensure auth packages are present
pnpm --filter api add @nestjs/jwt @nestjs/passport passport passport-jwt 2>/dev/null || true

pnpm --filter api exec prisma generate
pnpm --filter api exec prisma db push --skip-generate --accept-data-loss
