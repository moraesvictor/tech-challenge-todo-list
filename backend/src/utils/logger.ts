type LogLevel = 'info' | 'error' | 'warn' | 'debug' | 'success';

interface LoggerConfig {
  level: LogLevel;
  message: string;
  data?: any;
}

class Logger {
  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const emoji = this.getEmoji(level);
    const prefix = `[${timestamp}] ${emoji} [${level.toUpperCase()}]`;
    
    if (data) {
      return `${prefix} ${message}\n${JSON.stringify(data, null, 2)}`;
    }
    
    return `${prefix} ${message}`;
  }

  private getEmoji(level: LogLevel): string {
    const emojis: Record<LogLevel, string> = {
      info: 'ℹ️',
      error: '❌',
      warn: '⚠️',
      debug: '🔍',
      success: '✅',
    };
    return emojis[level] || 'ℹ️';
  }

  info(message: string, data?: any): void {
    console.log(this.formatMessage('info', message, data));
  }

  error(message: string, data?: any): void {
    console.error(this.formatMessage('error', message, data));
  }

  warn(message: string, data?: any): void {
    console.warn(this.formatMessage('warn', message, data));
  }

  debug(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(this.formatMessage('debug', message, data));
    }
  }

  success(message: string, data?: any): void {
    console.log(this.formatMessage('success', message, data));
  }

  server = {
    starting: (port: number) => {
      this.info(`Iniciando servidor na porta ${port}`);
    },
    started: (port: number, endpoints: string[]) => {
      this.success(`Servidor rodando na porta ${port}`);
      this.info(`API disponível em http://localhost:${port}`);
      this.info('Endpoints disponíveis:');
      endpoints.forEach(endpoint => this.info(`   ${endpoint}`));
    },
    stopping: () => {
      this.info('Encerrando servidor...');
    },
    stopped: () => {
      this.success('Servidor encerrado');
    },
  };

  database = {
    connecting: (config: { host: string; port: number; user: string; database: string }) => {
      this.info('Tentando conectar ao banco de dados...');
      this.info(`   Host: ${config.host}`);
      this.info(`   Porta: ${config.port}`);
      this.info(`   Usuário: ${config.user}`);
      this.info(`   Banco: ${config.database}`);
    },
    connected: () => {
      this.success('Banco de dados conectado com sucesso');
    },
    connectionError: (error: any, config?: { host: string; port: number; user: string; database: string }) => {
      this.error('Erro de conexão com banco de dados');
      if (config) {
        this.error(`   Host: ${config.host}`);
        this.error(`   Porta: ${config.port}`);
        this.error(`   Usuário: ${config.user}`);
        this.error(`   Banco: ${config.database}`);
      }
      if (error.message) {
        this.error(`   Erro: ${error.message}`);
      }
    },
    authError: () => {
      this.error('Erro de autenticação');
      this.error('   Usuário ou senha incorretos');
      this.error('   Verifique a DATABASE_URL no arquivo .env');
    },
    databaseNotFound: (databaseName: string) => {
      this.error('Banco de dados não encontrado');
      this.error(`   O banco "${databaseName}" não existe`);
      this.error(`   Crie o banco com: CREATE DATABASE ${databaseName};`);
    },
    hostNotFound: (host: string) => {
      this.error('Erro de conexão com banco de dados');
      this.error(`   Não foi possível encontrar o host: ${host}`);
      this.error('   Verifique a configuração DATABASE_URL no arquivo .env');
    },
  };

  postgres = {
    notRunning: () => {
      this.error('Erro de conexão com PostgreSQL');
      this.warn('   O PostgreSQL não está rodando ou não está instalado.');
      this.info('');
      this.info('   Se o PostgreSQL não estiver instalado (WSL/Linux):');
      this.info('     Execute: cd backend && ./install-postgres.sh');
      this.info('     ou instale manualmente:');
      this.info('     sudo apt update');
      this.info('     sudo apt install postgresql postgresql-contrib');
      this.info('     sudo service postgresql start');
      this.info('');
      this.info('   Se o PostgreSQL já estiver instalado:');
      this.info('     Linux/WSL:');
      this.info('       sudo service postgresql start');
      this.info('       ou');
      this.info('       sudo systemctl start postgresql');
      this.info('');
      this.info('     macOS:');
      this.info('       brew services start postgresql');
      this.info('');
      this.info('     Windows:');
      this.info('       Inicie o serviço PostgreSQL no Services (services.msc)');
    },
  };
}

export const logger = new Logger();

