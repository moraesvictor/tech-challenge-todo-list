'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter } from '@modules/tasks/types';
import { taskService } from '@modules/tasks/services/taskService';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  error: string | null;
  setFilter: (filter: TaskFilter) => void;
  refreshTasks: () => Promise<void>;
  createTask: (descricao: string) => Promise<void>;
  updateTaskStatus: (id: string, status: Task['status']) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('todas');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Erro ao carregar tarefas'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pendentes') return task.status === 'pendente';
    if (filter === 'concluidas') return task.status === 'concluida';
    return true;
  });

  const createTask = useCallback(async (descricao: string) => {
    try {
      setError(null);
      await taskService.createTask({ descricao });
      await fetchTasks();
    } catch (err) {
      throw err instanceof Error
        ? err
        : new Error('Erro ao criar tarefa');
    }
  }, [fetchTasks]);

  const updateTaskStatus = useCallback(
    async (id: string, status: Task['status']) => {
      try {
        setError(null);
        await taskService.updateTaskStatus(id, { status });
        await fetchTasks();
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error('Erro ao atualizar tarefa');
      }
    },
    [fetchTasks]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      try {
        setError(null);
        await taskService.deleteTask(id);
        await fetchTasks();
      } catch (err) {
        throw err instanceof Error
          ? err
          : new Error('Erro ao deletar tarefa');
      }
    },
    [fetchTasks]
  );

  return {
    tasks,
    filteredTasks,
    filter,
    isLoading,
    error,
    setFilter,
    refreshTasks: fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
};

