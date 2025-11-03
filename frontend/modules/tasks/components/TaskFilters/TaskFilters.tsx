'use client';

import { TaskFilter } from '@modules/tasks/types';
import { Button } from '@shared/components/Button';

interface TaskFiltersProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'pendentes', label: 'Pendentes' },
  { value: 'concluidas', label: 'Concluídas' },
];

export const TaskFilters = ({
  currentFilter,
  onFilterChange,
}: TaskFiltersProps) => {
  return (
    <div
      className="flex gap-2 mb-6"
      role="group"
      aria-label="Filtros de tarefas"
    >
      {filters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          variant={currentFilter === filter.value ? 'primary' : 'secondary'}
          aria-pressed={currentFilter === filter.value}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
};

