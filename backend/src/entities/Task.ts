import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TaskStatus {
  PENDENTE = 'pendente',
  CONCLUIDA = 'concluida',
}

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 500 })
  descricao!: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.PENDENTE,
    enumName: 'task_status_enum',
  })
  status!: TaskStatus;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao!: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao!: Date;
}

