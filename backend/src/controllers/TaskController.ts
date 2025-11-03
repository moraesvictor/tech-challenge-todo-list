import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';
import { CreateTaskDto } from '../dto/CreateTaskDto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatusDto';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async create(req: Request, res: Response): Promise<Response> {
    const createTaskDto = req.body as CreateTaskDto;
    const task = await this.taskService.createTask(createTaskDto);

    return res.status(201).json({
      status: 'success',
      data: task,
    });
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.getAllTasks();

    return res.status(200).json({
      status: 'success',
      data: tasks,
    });
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const task = await this.taskService.getTaskById(id);

    return res.status(200).json({
      status: 'success',
      data: task,
    });
  }

  async updateStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateTaskStatusDto = req.body as UpdateTaskStatusDto;
    const task = await this.taskService.updateTaskStatus(
      id,
      updateTaskStatusDto
    );

    return res.status(200).json({
      status: 'success',
      data: task,
    });
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.taskService.deleteTask(id);

    return res.status(204).send();
  }
}

