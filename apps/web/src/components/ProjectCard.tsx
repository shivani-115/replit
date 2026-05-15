import type { Project } from '@portfolio/shared';

type Props = {
  project: Project;
  onDelete?: (id: string) => void;
  onEdit?: (project: Project) => void;
};

export default function ProjectCard({ project, onDelete, onEdit }: Props) {
  const techs = project.techStack
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-slate-900">
          {project.title}
        </h3>
        <div className="flex shrink-0 gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(project)}
              className="rounded-md border border-brand px-2 py-1 text-xs font-medium text-brand transition hover:bg-brand/10"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(project.id)}
              className="rounded-md border border-red-200 px-2 py-1 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
        {project.description}
      </p>

      {techs.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {techs.map((t) => (
            <span
              key={t}
              className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
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
