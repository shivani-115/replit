import type {
  Project,
  Contact,
  CreateProjectInput,
  CreateContactInput,
  UpdateProjectInput,
} from '@portfolio/shared';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (typeof window === 'undefined' ? 'http://127.0.0.1:8000/api' : '/api');

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error (${res.status}): ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

function authHeaders(token: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function adminLogin(password: string): Promise<string> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await handle<{ access_token: string }>(res);
  return data.access_token;
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, { cache: 'no-store' });
  return handle<Project[]>(res);
}

export async function createProject(
  input: CreateProjectInput,
  token: string,
): Promise<Project> {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  return handle<Project>(res);
}

export async function updateProject(
  id: string,
  input: UpdateProjectInput,
  token: string,
): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(input),
  });
  return handle<Project>(res);
}

export async function deleteProject(id: string, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to delete project: ${res.statusText}`);
  }
}

export async function createContact(
  input: CreateContactInput,
): Promise<Contact> {
  const res = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handle<Contact>(res);
}
