import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Monorepo
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              pnpm workspaces + Turborepo run web and api side-by-side.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Type-safe
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Shared TypeScript types between Next.js and NestJS via the
              <code className="mx-1 rounded bg-slate-100 px-1 text-xs">
                @portfolio/shared
              </code>
              package.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-base font-semibold text-slate-900">
              Prisma + PostgreSQL
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              A single Prisma schema models projects and contact form
              submissions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
