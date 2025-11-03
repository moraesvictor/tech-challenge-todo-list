import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { validateDto } from '../middleware/validation';
import { CreateTaskDto } from '../dto/CreateTaskDto';
import { UpdateTaskStatusDto } from '../dto/UpdateTaskStatusDto';

const router = Router();
const taskController = new TaskController();

router.post(
  '/',
  validateDto(CreateTaskDto),
  (req, res, next) => {
    taskController.create(req, res).catch(next);
  }
);

router.get('/', (req, res, next) => {
  taskController.findAll(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  taskController.findById(req, res).catch(next);
});

router.patch(
  '/:id/status',
  validateDto(UpdateTaskStatusDto),
  (req, res, next) => {
    taskController.updateStatus(req, res).catch(next);
  }
);

router.delete('/:id', (req, res, next) => {
  taskController.delete(req, res).catch(next);
});

export default router;

