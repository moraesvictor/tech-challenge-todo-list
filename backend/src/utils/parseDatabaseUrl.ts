export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export function parseDatabaseUrlForDisplay(url: string): DatabaseConfig | null {
  try {
    const dbUrl = url.trim();
    const protocolMatch = dbUrl.match(/^(postgresql?:\/\/)/);
    
    if (!protocolMatch) {
      return null;
    }
    
    const protocol = protocolMatch[1];
    const withoutProtocol = dbUrl.substring(protocol.length);
    const lastAt = withoutProtocol.lastIndexOf('@');
    
    if (lastAt === -1) {
      return null;
    }
    
    const credentials = withoutProtocol.substring(0, lastAt);
    const hostAndPath = withoutProtocol.substring(lastAt + 1);
    const colonIndex = credentials.indexOf(':');
    
    if (colonIndex === -1) {
      return null;
    }
    
    const username = credentials.substring(0, colonIndex);
    const password = credentials.substring(colonIndex + 1);
    const urlObj = new URL(protocol + 'dummy@' + hostAndPath);
    
    return {
      host: urlObj.hostname,
      port: parseInt(urlObj.port || '5432'),
      username: decodeURIComponent(username),
      password: decodeURIComponent(password),
      database: urlObj.pathname.slice(1) || 'tarefas_db',
    };
  } catch (error) {
    return null;
  }
}

