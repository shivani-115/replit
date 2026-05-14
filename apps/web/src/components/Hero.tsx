import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="flex flex-col items-start gap-6">
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          Portfolio POC · Monorepo
        </span>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Building things with{' '}
          <span className="text-brand">Next.js</span>,{' '}
          <span className="text-brand">NestJS</span> &amp; Prisma.
        </h1>
        <p className="max-w-2xl text-base text-slate-600 md:text-lg">
          Featured work, a contact flow, and a small admin—everything runs
          through a live REST API with NestJS and Prisma. Browse the
          projects, say hello, or publish new pieces from the panel.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-brand-dark"
          >
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
