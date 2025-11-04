'use client';

import { TaskForm, TaskList, TaskFilters } from '../';
import { useTasks } from '@modules/tasks/hooks/useTasks';
import { Loading } from '@shared/components';

export const TaskContainer = () => {
  const {
    filteredTasks,
    filter,
    isLoading,
    setFilter,
    createTask,
    updateTaskStatus,
    deleteTask,
  } = useTasks();

  return (
    <>
      <section className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Adicionar Nova Tarefa
        </h2>
        <TaskForm onSubmit={createTask} isLoading={isLoading} />
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Lista de Tarefas
          </h2>
          {!isLoading && (
            <span className="text-sm text-gray-500">
              {filteredTasks.length}{' '}
              {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
            </span>
          )}
        </div>

        <TaskFilters currentFilter={filter} onFilterChange={setFilter} />

        {isLoading ? (
          <Loading />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleStatus={updateTaskStatus}
            onDelete={deleteTask}
          />
        )}
      </section>
    </>
  );
};

