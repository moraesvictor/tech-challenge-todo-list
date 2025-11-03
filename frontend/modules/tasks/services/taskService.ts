import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@shared/config/api';
import { Task, TaskStatus } from '@modules/tasks/types';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface CreateTaskDto {
  descricao: string;
}

export interface UpdateTaskStatusDto {
  status: TaskStatus;
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: string[];
}

class TaskService {
  async createTask(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<ApiResponse<Task>>(
      API_ENDPOINTS.TASKS,
      data
    );
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Erro ao criar tarefa');
    }
    return response.data.data!;
  }

  async getAllTasks(): Promise<Task[]> {
    const response = await api.get<ApiResponse<Task[]>>(API_ENDPOINTS.TASKS);
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Erro ao buscar tarefas');
    }
    return response.data.data || [];
  }

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get<ApiResponse<Task>>(
      API_ENDPOINTS.TASK_BY_ID(id)
    );
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Erro ao buscar tarefa');
    }
    return response.data.data!;
  }

  async updateTaskStatus(
    id: string,
    data: UpdateTaskStatusDto
  ): Promise<Task> {
    const response = await api.patch<ApiResponse<Task>>(
      API_ENDPOINTS.TASK_STATUS(id),
      data
    );
    if (response.data.status === 'error') {
      throw new Error(response.data.message || 'Erro ao atualizar tarefa');
    }
    return response.data.data!;
  }

  async deleteTask(id: string): Promise<void> {
    await api.delete(API_ENDPOINTS.TASK_BY_ID(id));
  }
}

export const taskService = new TaskService();

