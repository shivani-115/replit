# Portfolio POC

A lightweight portfolio monorepo for testing / POC purposes.

**Stack**

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: NestJS 10 + Prisma + PostgreSQL
- **Monorepo**: pnpm workspaces + Turborepo
- **Shared types**: `@portfolio/shared` workspace package

> No Docker. No auth. Just the basics, wired end-to-end.

---

## Project structure

```
portfolio-poc/
├── apps/
│   ├── web/                 → Next.js frontend  (http://localhost:3000)
│   └── api/                 → NestJS backend    (http://localhost:4000/api)
│       └── prisma/
│           └── schema.prisma → Project + Contact models
├── packages/
│   └── shared/              → Shared TypeScript types
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## Prerequisites

1. **Node.js** ≥ 18
2. **pnpm** ≥ 9 — install via `npm install -g pnpm`
3. **PostgreSQL** running locally (default port `5432`)

Create a database named `portfolio`:

```bash
psql -U postgres -c "CREATE DATABASE portfolio;"
```

If your local PostgreSQL uses different credentials, update the `DATABASE_URL` in `apps/api/.env`.

---

## Setup (one-time)

From the repo root:

```bash
# 1. Install all workspace deps
pnpm install

# 2. Push the Prisma schema to your database
pnpm db:push

# (or, if you prefer migration history)
# pnpm db:migrate
```

Environment files are already created with sensible defaults:

- `apps/api/.env`
  ```
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio?schema=public"
  PORT=4000
  CORS_ORIGIN=http://localhost:3000
  ```
- `apps/web/.env.local`
  ```
  NEXT_PUBLIC_API_URL=http://localhost:4000/api
  ```

Adjust the DB user / password if needed.

---

## Run everything

```bash
pnpm dev
```

Turborepo will start both apps in parallel:

- Web: http://localhost:3000
- API: http://localhost:4000/api

### Run one at a time

```bash
pnpm --filter web dev
pnpm --filter api dev
```

---

## Useful scripts

From the repo root:

| Script             | What it does                              |
| ------------------ | ----------------------------------------- |
| `pnpm dev`         | Run web + api in dev mode (Turbo)         |
| `pnpm build`       | Build all apps                            |
| `pnpm db:generate` | Generate the Prisma client                |
| `pnpm db:push`     | Sync schema to DB (no migration history)  |
| `pnpm db:migrate`  | Create + apply a Prisma migration         |
| `pnpm db:studio`   | Open Prisma Studio                        |

---

## REST API

Base URL: `http://localhost:4000/api`

### Projects

| Method | Path              | Body                                                | Description           |
| ------ | ----------------- | --------------------------------------------------- | --------------------- |
| GET    | `/projects`       | —                                                   | List all projects     |
| POST   | `/projects`       | `{ title, description, techStack, githubUrl }`      | Create a new project  |
| DELETE | `/projects/:id`   | —                                                   | Delete a project      |

### Contacts

| Method | Path         | Body                          | Description                   |
| ------ | ------------ | ----------------------------- | ----------------------------- |
| GET    | `/contacts`  | —                             | List all contact submissions  |
| POST   | `/contacts`  | `{ name, email, message }`    | Submit the contact form       |

### Quick test

```bash
# Create a project
curl -X POST http://localhost:4000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Portfolio",
    "description": "Sample project for the POC",
    "techStack": "Next.js, NestJS, Prisma",
    "githubUrl": "https://github.com/user/repo"
  }'

# List projects
curl http://localhost:4000/api/projects
```

---

## Pages

| Route        | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `/`          | Home — hero section + feature highlights                           |
| `/projects`  | Lists all projects fetched from the API                            |
| `/contact`   | Contact form (POST → `/api/contacts`)                              |
| `/admin`     | Add, list, and delete projects (no auth — POC only)                |

---

## Troubleshooting

- **`Can't reach database server`** → make sure PostgreSQL is running and `DATABASE_URL` in `apps/api/.env` is correct.
- **Prisma client errors after editing the schema** → run `pnpm db:generate`.
- **CORS / API errors in the browser** → confirm the API is on port `4000` and `NEXT_PUBLIC_API_URL` in `apps/web/.env.local` matches.
- **Port already in use** → change `PORT` in `apps/api/.env` or run with a different port: `pnpm --filter web dev -- -p 3001`.
