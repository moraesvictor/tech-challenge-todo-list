import { IsEnum, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../entities/Task';

export class UpdateTaskStatusDto {
  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsEnum(TaskStatus, { message: 'O status deve ser "pendente" ou "concluida"' })
  status!: TaskStatus;
}

