'use client';

import { Task } from '@modules/tasks/types';
import { TaskItem } from '../TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const TaskList = ({
  tasks,
  onToggleStatus,
  onDelete,
  isLoading,
}: TaskListProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Carregando tarefas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3" role="list" aria-label="Lista de tarefas">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

