export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
  createdAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  techStack: string;
  githubUrl: string;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  techStack?: string;
  githubUrl?: string;
}

export interface CreateContactInput {
  name: string;
  email: string;
  message: string;
}
