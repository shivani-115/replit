import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/api';
import type { Project } from '@portfolio/shared';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let error: string | null = null;

  try {
    projects = await getProjects();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load projects';
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Projects
        </h1>
        <p className="mt-2 text-slate-600">
          A selection of recent work. Data loaded from the NestJS API.
        </p>
      </header>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <strong className="font-semibold">Could not load projects.</strong>{' '}
          {error}
          <p className="mt-1 text-red-600/80">
            Make sure the API is running on{' '}
            <code className="font-mono">http://localhost:4000</code>.
          </p>
        </div>
      )}

      {!error && projects.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500">
          No projects yet. Head to the{' '}
          <a className="text-brand underline" href="/admin">
            admin page
          </a>{' '}
          to add one.
        </div>
      )}

      {projects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}
    </section>
  );
}
