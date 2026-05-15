'use client';

import { useState } from 'react';

const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    label: 'Monorepo',
    title: 'Monorepo',
    description: 'pnpm workspaces + Turborepo run web and api side-by-side.',
    detail: 'A single repo, two apps, zero duplication. Shared scripts, dependencies, and types keep everything in sync.',
    accent: 'from-violet-500 to-purple-600',
    bg: 'hover:bg-violet-50',
    border: 'hover:border-violet-300',
    text: 'text-violet-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    label: 'Type-safe',
    title: 'Type-safe',
    description: (
      <>
        Shared TypeScript types between Next.js and NestJS via the{' '}
        <code className="rounded bg-slate-100 px-1 text-xs">@portfolio/shared</code> package.
      </>
    ),
    detail: 'One source of truth for every model. If the API changes, the frontend TypeScript compiler tells you immediately.',
    accent: 'from-sky-500 to-blue-600',
    bg: 'hover:bg-sky-50',
    border: 'hover:border-sky-300',
    text: 'text-sky-600',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    label: 'Prisma + PostgreSQL',
    title: 'Prisma + PostgreSQL',
    description: 'A single Prisma schema models projects and contact form submissions.',
    detail: 'Type-safe database queries with Prisma ORM, backed by a managed PostgreSQL instance. Migrations are a one-liner.',
    accent: 'from-emerald-500 to-teal-600',
    bg: 'hover:bg-emerald-50',
    border: 'hover:border-emerald-300',
    text: 'text-emerald-600',
  },
];

export default function FeatureCards() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, i) => {
          const isOpen = expanded === i;
          return (
            <button
              key={card.label}
              onClick={() => setExpanded(isOpen ? null : i)}
              className={[
                'group relative flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-white p-6 text-left',
                'shadow-sm transition-all duration-200 cursor-pointer outline-none',
                'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400',
                card.bg,
                card.border,
                isOpen ? 'shadow-md' : 'hover:shadow-md hover:-translate-y-0.5',
              ].join(' ')}
            >
              <div className={`inline-flex rounded-lg bg-gradient-to-br p-2.5 text-white ${card.accent}`}>
                {card.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-base font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{card.description}</p>
              </div>

              <div
                className={[
                  'overflow-hidden text-sm transition-all duration-300',
                  card.text,
                  isOpen ? 'max-h-24 opacity-100 mt-1' : 'max-h-0 opacity-0',
                ].join(' ')}
              >
                {card.detail}
              </div>

              <span className={`text-xs font-medium transition-colors ${card.text} opacity-0 group-hover:opacity-100`}>
                {isOpen ? 'Close ↑' : 'Learn more ↓'}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
