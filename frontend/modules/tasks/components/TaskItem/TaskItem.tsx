'use client';

import { Task } from '@modules/tasks/types';
import { formatDate } from '@shared/utils/date';
import { Button } from '@shared/components/Button';
import { useModal } from '@shared/components/Modal';
import clsx from 'clsx';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string, status: Task['status']) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({
  task,
  onToggleStatus,
  onDelete,
}: TaskItemProps) => {
  const modal = useModal();

  const handleToggleStatus = () => {
    const newStatus = task.status === 'pendente' ? 'concluida' : 'pendente';
    onToggleStatus(task.id, newStatus);
  };

  const handleDelete = () => {
    modal.open({
      title: 'Confirmar exclusão',
      content: (
        <div className="space-y-4">
          <p className="text-gray-700">
            Tem certeza que deseja excluir esta tarefa?
          </p>
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={modal.close}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onDelete(task.id);
                modal.close();
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      ),
    });
  };

  return (
    <li
      className={clsx(
        'p-4 bg-white rounded-lg shadow-sm border-l-4',
        {
          'border-green-500 opacity-75': task.status === 'concluida',
          'border-blue-500': task.status === 'pendente',
        }
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <input
              type="checkbox"
              checked={task.status === 'concluida'}
              onChange={handleToggleStatus}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              aria-label={`Marcar tarefa como ${task.status === 'pendente' ? 'concluída' : 'pendente'}`}
            />
            <p
              className={clsx('flex-1', {
                'line-through text-gray-500': task.status === 'concluida',
                'text-gray-900': task.status === 'pendente',
              })}
            >
              {task.descricao}
            </p>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            Criada em {formatDate(task.dataCriacao)}
          </p>
        </div>
        <Button
          variant="danger"
          onClick={handleDelete}
          aria-label={`Excluir tarefa: ${task.descricao}`}
        >
          Excluir
        </Button>
      </div>
    </li>
  );
};

