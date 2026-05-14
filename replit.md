# Portfolio POC

A pnpm + Turborepo monorepo containing:

- `apps/web` — Next.js 14 frontend (port 5000, host 0.0.0.0)
- `apps/api` — NestJS REST API (port 8000, host 127.0.0.1)
- `packages/shared` — Shared TypeScript types

The frontend proxies `/api/*` to the backend via `next.config.js` rewrites, so
in the browser only the web port is exposed.

## Replit setup

- PostgreSQL is provisioned; connection string is in `DATABASE_URL`.
- Prisma schema lives in `apps/api/prisma/schema.prisma` and has been pushed
  to the database (`pnpm db:push`).
- Workflows:
  - `Start application` — `pnpm --filter web dev` on port 5000
  - `API` — `PORT=8000 pnpm --filter api dev` on port 8000
- Deployment: VM target; build compiles both apps and `start:prod` runs the
  API and Next.js together.

## User preferences

(none recorded yet)
