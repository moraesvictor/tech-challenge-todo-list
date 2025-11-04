import { Task } from '@shared/types';

export const createTask = (overrides?: Partial<Task>): Task => {
  const now = new Date().toISOString();

  return {
    id: 'test-id-123',
    descricao: 'Tarefa de teste',
    status: 'pendente',
    dataCriacao: now,
    dataAtualizacao: now,
    ...overrides,
  };
};

export const createPendingTask = (overrides?: Partial<Task>): Task => {
  return createTask({
    status: 'pendente',
    ...overrides,
  });
};

export const createCompletedTask = (overrides?: Partial<Task>): Task => {
  return createTask({
    status: 'concluida',
    ...overrides,
  });
};

