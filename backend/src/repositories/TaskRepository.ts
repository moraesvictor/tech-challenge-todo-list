import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Task, TaskStatus } from '../entities/Task';

export class TaskRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = AppDataSource.getRepository(Task);
  }

  async create(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return await this.repository.find({
      order: {
        dataCriacao: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Task | null> {
    return await this.repository.findOne({
      where: { id },
    });
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task | null> {
    const task = await this.findById(id);
    if (!task) {
      return null;
    }

    task.status = status;
    return await this.repository.save(task);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}

