'use client';

import { FormEvent, useEffect, useState } from 'react';
import type { Project } from '@portfolio/shared';
import {
  adminLogin,
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from '@/lib/api';
import ProjectCard from '@/components/ProjectCard';

const TOKEN_KEY = 'admin_token';

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) setToken(stored);
  }, []);

  useEffect(() => {
    if (token) loadProjects();
  }, [token]);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const t = await adminLogin(loginPassword);
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      setLoginPassword('');
    } catch {
      setLoginError('Invalid password. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setProjects([]);
    setEditingProject(null);
    setForm(emptyForm);
  }

  async function loadProjects() {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(project: Project) {
    setEditingProject(project);
    setForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      githubUrl: project.githubUrl,
    });
    setFormError(null);
  }

  function handleCancelEdit() {
    setEditingProject(null);
    setForm(emptyForm);
    setFormError(null);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);
    setFormError(null);

    try {
      if (editingProject) {
        const updated = await updateProject(editingProject.id, form, token);
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
        setEditingProject(null);
        setForm(emptyForm);
      } else {
        await createProject(form, token);
        setForm(emptyForm);
        await loadProjects();
      }
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : editingProject
            ? 'Failed to update'
            : 'Failed to create';
      if (msg.includes('401')) {
        setFormError('Session expired. Please log out and sign in again.');
      } else {
        setFormError(msg);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!token || !confirm('Delete this project?')) return;
    try {
      await deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editingProject?.id === id) {
        setEditingProject(null);
        setForm(emptyForm);
      }
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Failed to delete project');
    }
  }

  if (!token) {
    return (
      <section className="mx-auto max-w-md px-6 py-24">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Admin Login</h1>
              <p className="text-sm text-slate-500">Enter your admin password to continue</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                autoFocus
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                placeholder="Enter admin password"
              />
            </div>

            {loginError && (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-md bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  const isEditing = editingProject !== null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Admin
          </h1>
          <p className="mt-2 text-slate-600">Add and manage portfolio projects.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Log out
        </button>
      </header>

      <div className="grid gap-10 lg:grid-cols-[400px,1fr]">
        <form
          onSubmit={handleSubmit}
          className="h-fit space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              {isEditing ? 'Edit Project' : 'Add Project'}
            </h2>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            )}
          </div>

          {isEditing && (
            <p className="rounded-md bg-violet-50 px-3 py-2 text-xs text-violet-700">
              Editing: <span className="font-semibold">{editingProject.title}</span>
            </p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full resize-y rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Tech stack</label>
            <input
              required
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
              placeholder="Next.js, NestJS, Prisma"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
            <p className="mt-1 text-xs text-slate-500">Comma-separated list.</p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">GitHub URL</label>
            <input
              type="url"
              required
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
              placeholder="https://github.com/user/repo"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          {formError && (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Saving…' : isEditing ? 'Save Changes' : 'Add Project'}
          </button>
        </form>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">All Projects</h2>
            <button
              onClick={loadProjects}
              className="text-sm font-medium text-violet-600 hover:text-violet-700"
            >
              Refresh
            </button>
          </div>

          {loading && <p className="text-sm text-slate-500">Loading projects…</p>}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500">
              No projects yet.
            </div>
          )}

          {!loading && projects.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
