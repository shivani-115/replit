import Link from 'next/link';

export default function Hero() {
  return (
    <section className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-b from-blue-50/60 dark:from-blue-950/30 to-transparent transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 md:py-28">
        <span className="rounded-full border border-brand/20 bg-white dark:bg-slate-800 dark:border-brand/30 px-3 py-1 text-xs font-medium text-brand">
          Live · Portfolio POC
        </span>
        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl lg:text-7xl">
          Ship products people{' '}
          <span className="bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent">
            actually want to use
          </span>
          .
        </h1>
        <p className="max-w-2xl text-base text-slate-600 dark:text-slate-400 md:text-lg">
          A full-stack portfolio demo—browse projects, send a message, or
          manage content from the admin panel.
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
            className="rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 transition hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
