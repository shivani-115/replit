#!/bin/bash
set -e

pnpm install --frozen-lockfile=false
pnpm --filter api exec prisma generate
pnpm --filter api exec prisma db push --skip-generate --accept-data-loss
