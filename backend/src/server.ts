import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import { createApp } from './app';
import { logger } from './utils/logger';
import { parseDatabaseUrlForDisplay } from './utils/parseDatabaseUrl';

dotenv.config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    if (process.env.DATABASE_URL) {
      const dbConfig = parseDatabaseUrlForDisplay(process.env.DATABASE_URL);
      if (dbConfig) {
        logger.database.connecting({
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.username,
          database: dbConfig.database,
        });
      } else {
        logger.info('Usando DATABASE_URL (erro ao parsear para exibição)');
      }
    } else {
      logger.database.connecting({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USERNAME || 'postgres',
        database: process.env.DB_NAME || 'tarefas_db',
      });
    }
    
    await AppDataSource.initialize();
    logger.database.connected();

    const app = createApp();

    app.listen(PORT, () => {
      logger.server.started(Number(PORT), [
        'POST   /tasks',
        'GET    /tasks',
        'GET    /tasks/:id',
        'PATCH  /tasks/:id/status',
        'DELETE /tasks/:id',
      ]);
    });
  } catch (error: any) {
    logger.error('Erro ao iniciar servidor!');
    
    if (error.code === 'ECONNREFUSED') {
      logger.postgres.notRunning();
      
      if (process.env.DATABASE_URL) {
        const dbConfig = parseDatabaseUrlForDisplay(process.env.DATABASE_URL);
        if (dbConfig) {
          logger.database.connectionError(error, {
            host: dbConfig.host,
            port: dbConfig.port,
            user: dbConfig.username,
            database: dbConfig.database,
          });
        }
      } else {
        logger.database.connectionError(error, {
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          user: process.env.DB_USERNAME || 'postgres',
          database: process.env.DB_NAME || 'tarefas_db',
        });
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
      if (process.env.DATABASE_URL) {
        const dbConfig = parseDatabaseUrlForDisplay(process.env.DATABASE_URL);
        if (dbConfig) {
          logger.database.hostNotFound(dbConfig.host);
        } else {
          logger.error('Não foi possível encontrar o host configurado');
          logger.error('Verifique a configuração DATABASE_URL no arquivo .env');
        }
      } else {
        logger.database.hostNotFound(process.env.DB_HOST || 'localhost');
      }
    } else if (error.code === '28P01') {
      logger.database.authError();
    } else if (error.code === '3D000') {
      if (process.env.DATABASE_URL) {
        const dbConfig = parseDatabaseUrlForDisplay(process.env.DATABASE_URL);
        if (dbConfig) {
          logger.database.databaseNotFound(dbConfig.database);
        } else {
          logger.error('O banco especificado na DATABASE_URL não existe');
          logger.error('Crie o banco conforme configurado na DATABASE_URL');
        }
      } else {
        logger.database.databaseNotFound(process.env.DB_NAME || 'tarefas_db');
      }
    } else {
      logger.error('Detalhes do erro', { message: error.message, code: error.code });
    }
    
    process.exit(1);
  }
}

process.on('unhandledRejection', (error) => {
  logger.error('Erro não tratado', error);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  logger.server.stopping();
  await AppDataSource.destroy();
  logger.server.stopped();
  process.exit(0);
});

startServer();

