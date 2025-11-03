import { DataSource } from 'typeorm';
import { Task } from '../entities/Task';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';

dotenv.config();

function parseDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    try {
      let dbUrl = process.env.DATABASE_URL.trim();
      
      if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
        dbUrl = 'postgresql://' + dbUrl;
      }
      
      const protocolMatch = dbUrl.match(/^(postgresql?:\/\/)/);
      if (!protocolMatch) {
        throw new Error('Protocolo inválido');
      }
      
      const protocol = protocolMatch[1];
      const withoutProtocol = dbUrl.substring(protocol.length);
      
      const lastAt = withoutProtocol.lastIndexOf('@');
      if (lastAt === -1) {
        throw new Error('Formato de URL inválido: falta @');
      }
      
      const credentials = withoutProtocol.substring(0, lastAt);
      const hostAndPath = withoutProtocol.substring(lastAt + 1);
      
      const colonIndex = credentials.indexOf(':');
      if (colonIndex === -1) {
        throw new Error('Formato de URL inválido: falta : entre usuário e senha');
      }
      
      const username = credentials.substring(0, colonIndex);
      const password = credentials.substring(colonIndex + 1);
      
      const url = new URL(protocol + 'dummy@' + hostAndPath);
      
      const host = url.hostname;
      const port = parseInt(url.port || '5432');
      const database = url.pathname.slice(1) || 'tarefas_db';
      
      const decodedPassword = decodeURIComponent(password);
      
      return {
        host,
        port,
        username: decodeURIComponent(username),
        password: decodedPassword,
        database,
      };
    } catch (error) {
      logger.warn('Erro ao parsear DATABASE_URL, usando variáveis individuais');
      logger.warn(`URL fornecida: ${process.env.DATABASE_URL}`);
      logger.warn(`Erro: ${error instanceof Error ? error.message : error}`);
      return null;
    }
  }
  return null;
}

const dbConfig = parseDatabaseUrl();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: dbConfig?.host || process.env.DB_HOST || 'localhost',
  port: dbConfig?.port || parseInt(process.env.DB_PORT || '5432'),
  username: dbConfig?.username || process.env.DB_USERNAME || 'postgres',
  password: dbConfig?.password || process.env.DB_PASSWORD || 'postgres',
  database: dbConfig?.database || process.env.DB_NAME || 'tarefas_db',
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Task],
  migrations: ['src/database/migrations/**/*.ts'],
  subscribers: ['src/database/subscribers/**/*.ts'],
  connectTimeoutMS: 5000,
});

