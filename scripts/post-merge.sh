#!/bin/bash
set -e

pnpm install --frozen-lockfile=false
pnpm --filter api add @nestjs/jwt @nestjs/passport passport passport-jwt 2>/dev/null || true
pnpm --filter api exec prisma generate
pnpm --filter api exec prisma db push --skip-generate --accept-data-loss
