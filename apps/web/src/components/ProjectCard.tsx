import type { Project } from '@portfolio/shared';

type Props = {
  project: Project;
  onDelete?: (id: string) => void;
};

export default function ProjectCard({ project, onDelete }: Props) {
  const techs = project.techStack
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          {project.title}
        </h3>
        {onDelete && (
          <button
            onClick={() => onDelete(project.id)}
            className="rounded-md border border-red-200 dark:border-red-800 px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900/30"
          >
            Delete
          </button>
        )}
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {project.description}
      </p>

      {techs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {techs.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 dark:bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark"
      >
        View on GitHub
        <span aria-hidden>→</span>
      </a>
    </article>
  );
}
