'use client';

import { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '@portfolio/shared';

type Props = {
  projects: Project[];
};

export default function ProjectsFilter({ projects }: Props) {
  const [search, setSearch] = useState('');
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) =>
      p.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
        .forEach((t) => set.add(t))
    );
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.toLowerCase().includes(q);

      const matchesTech =
        !activeTech ||
        p.techStack
          .split(',')
          .map((t) => t.trim())
          .includes(activeTech);

      return matchesSearch && matchesTech;
    });
  }, [projects, search, activeTech]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 sm:max-w-xs"
        />
        <p className="text-sm text-slate-500">
          {filtered.length} of {projects.length} project{projects.length !== 1 ? 's' : ''}
        </p>
      </div>

      {allTechs.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTech(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              activeTech === null
                ? 'bg-brand text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {allTechs.map((tech) => (
            <button
              key={tech}
              onClick={() => setActiveTech(activeTech === tech ? null : tech)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                activeTech === tech
                  ? 'bg-brand text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500">
          No projects match your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
