import { Task, TaskStatus } from '../entities/Task';
import { TaskRepository } from '../repositories/TaskRepository';
import { CreateTaskDto } from '../dto/CreateTaskDto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatusDto';
import { NotFoundError, ValidationError } from '../errors/AppError';

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.descricao = createTaskDto.descricao.trim();
    task.status = TaskStatus.PENDENTE;

    return await this.taskRepository.create(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    return task;
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    const updatedTask = await this.taskRepository.updateStatus(
      id,
      updateTaskStatusDto.status
    );

    if (!updatedTask) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundError('Tarefa não encontrada');
    }

    const deleted = await this.taskRepository.delete(id);

    if (!deleted) {
      throw new NotFoundError('Tarefa não encontrada');
    }
  }
}

