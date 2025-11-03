export interface Task {
  id: string;
  descricao: string;
  status: 'pendente' | 'concluida';
  dataCriacao: string;
  dataAtualizacao: string;
}

export type TaskStatus = 'pendente' | 'concluida';

export type TaskFilter = 'todas' | 'pendentes' | 'concluidas';

