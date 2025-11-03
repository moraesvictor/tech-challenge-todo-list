import express, { Express } from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Express => {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/tasks', taskRoutes);

  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'ok',
      message: 'API está funcionando',
    });
  });

  app.use(errorHandler);

  return app;
};

