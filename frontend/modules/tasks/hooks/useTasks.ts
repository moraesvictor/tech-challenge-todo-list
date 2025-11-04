'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, TaskFilter } from '@modules/tasks/types';
import { taskService } from '@modules/tasks/services/taskService';
import { useToastMethods } from '@shared/components/Toast';

interface UseTasksReturn {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
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
  const toast = useToastMethods();

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar tarefas';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pendentes') return task.status === 'pendente';
    if (filter === 'concluidas') return task.status === 'concluida';
    return true;
  });

  const createTask = useCallback(
    async (descricao: string) => {
      try {
        await taskService.createTask({ descricao });
        await fetchTasks();
        toast.success('Tarefa criada com sucesso!');
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao criar tarefa';
        toast.error(errorMessage);
        throw err;
      }
    },
    [fetchTasks, toast]
  );

  const updateTaskStatus = useCallback(
    async (id: string, status: Task['status']) => {
      try {
        await taskService.updateTaskStatus(id, { status });
        await fetchTasks();
        toast.success(
          `Tarefa marcada como ${status === 'concluida' ? 'concluída' : 'pendente'}!`
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao atualizar tarefa';
        toast.error(errorMessage);
        throw err;
      }
    },
    [fetchTasks, toast]
  );

  const deleteTask = useCallback(
    async (id: string) => {
      try {
        await taskService.deleteTask(id);
        await fetchTasks();
        toast.success('Tarefa excluída com sucesso!');
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Erro ao deletar tarefa';
        toast.error(errorMessage);
        throw err;
      }
    },
    [fetchTasks, toast]
  );

  return {
    tasks,
    filteredTasks,
    filter,
    isLoading,
    setFilter,
    refreshTasks: fetchTasks,
    createTask,
    updateTaskStatus,
    deleteTask,
  };
};

