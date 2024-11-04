import axios from 'axios';
import { LoginForm, RegisterForm, TaskForm, Task, PaginatedTasks } from '../types';

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(data: LoginForm) {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);
    
    const response = await api.post('/login', formData);
    return response.data;
  },

  async register(data: RegisterForm) {
    const response = await api.post('/users/', data);
    return response.data;
  },
};

export const taskService = {
  async getTasks(page: number = 1, size: number = 10) {
    const response = await api.get<PaginatedTasks>(`/tasks/?page=${page}&size=${size}`);
    return response.data;
  },

  async getTask(id: number): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${id}`);
    return response.data;
  },
  
  async createTask(data: TaskForm) {
    const response = await api.post<Task>('/tasks/', data);
    return response.data;
  },

  async updateTask(id: number, data: Partial<TaskForm>) {
    const response = await api.put<Task>(`/tasks/${id}`, data);
    return response.data;
  },

  async deleteTask(id: number) {
    await api.delete(`/tasks/${id}`);
  },
};
