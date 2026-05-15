export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Portfolio POC · Built with Next.js, NestJS, Prisma &amp; Tailwind.
        </p>
        <p className="text-brand/80">© 2026 · Updated May 15</p>
      </div>
    </footer>
  );
}
