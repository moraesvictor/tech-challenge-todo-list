import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ValidationError as ClassValidatorError } from 'class-validator';
import { logger } from '../utils/logger';

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
    return;
  }

  if (
    Array.isArray((error as any).errors) &&
    (error as any).errors.every(
      (e: any) => e instanceof ClassValidatorError
    )
  ) {
    const validationErrors = (error as any).errors.map((e: any) => ({
      property: e.property,
      constraints: e.constraints,
    }));

    res.status(400).json({
      status: 'error',
      message: 'Erro de validação',
      errors: validationErrors,
    });
    return;
  }

  logger.error('Erro não tratado', error);
  res.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor',
  });
};

