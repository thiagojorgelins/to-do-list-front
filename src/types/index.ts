export type TaskStatus = 'Pendente' | 'Em andamento' | 'Concluída';

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string | null;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  created_at: string;
  updated_at: string | null;
  user_id: number;
}

export interface PaginatedTasks {
  data: Task[];
  current_page: number;
  total_pages: number;
  next: string | null;
  previous: string | null;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export interface TaskForm {
  title: string;
  description?: string | null;
  status: TaskStatus;
}

export interface TaskUpdateForm {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
}