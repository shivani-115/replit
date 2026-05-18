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

export class ValidationError extends Error {
  fieldErrors: Record<string, string>;

  constructor(fieldErrors: Record<string, string>) {
    super('Validation failed');
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

const KNOWN_FIELDS = ['title', 'description', 'techStack', 'githubUrl'];

function parseValidationMessages(messages: string[]): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  const unmatched: string[] = [];

  for (const msg of messages) {
    const field = KNOWN_FIELDS.find((f) => msg.startsWith(f + ' ') || msg.startsWith(f + '\t'));
    if (field) {
      if (!fieldErrors[field]) {
        const rawConstraint = msg.slice(field.length + 1);
        fieldErrors[field] =
          rawConstraint.charAt(0).toUpperCase() + rawConstraint.slice(1);
      }
    } else {
      unmatched.push(msg);
    }
  }

  if (unmatched.length > 0) {
    fieldErrors._general = unmatched.join('; ');
  }

  return fieldErrors;
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 400 && text) {
      try {
        const body = JSON.parse(text) as { message?: unknown };
        if (Array.isArray(body.message) && body.message.every((m) => typeof m === 'string')) {
          throw new ValidationError(parseValidationMessages(body.message as string[]));
        }
      } catch (e) {
        if (e instanceof ValidationError) throw e;
      }
    }
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
