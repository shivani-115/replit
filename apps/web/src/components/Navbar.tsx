'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin', label: 'Admin' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          Portfolio<span className="text-brand">.</span>
        </Link>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors ${
                    active
                      ? 'text-brand'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {open && (
        <ul className="border-t border-slate-200 bg-white px-6 py-3 md:hidden">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href} className="py-2">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm font-medium ${
                    active ? 'text-brand' : 'text-slate-700'
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
