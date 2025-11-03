# Guia Rápido de Setup

## Passos Rápidos

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar PostgreSQL

Crie o banco de dados:
```sql
CREATE DATABASE tarefas_db;
```

### 3. Criar arquivo .env

Crie um arquivo `.env` na raiz da pasta `backend/`:

**Opção 1: Usar DATABASE_URL (recomendado)**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DATABASE_URL=postgresql://postgres:senha@localhost:5432/tarefas_db
```

**Opção 2: Usar variáveis individuais**
```env
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_postgres
DB_NAME=tarefas_db
```

**Nota:** Se `DATABASE_URL` estiver definida, ela terá prioridade sobre as variáveis individuais.

### 4. Rodar migrations (opcional)

Em desenvolvimento, o TypeORM sincroniza automaticamente. Se preferir usar migrations:

```bash
npm run migration:run
```

### 5. Iniciar servidor

```bash
npm run dev
```

## Testar a API

### Criar uma tarefa
```bash
curl -X POST http://localhost:3001/tasks \
  -H "Content-Type: application/json" \
  -d '{"descricao": "Minha primeira tarefa"}'
```

### Listar todas as tarefas
```bash
curl http://localhost:3001/tasks
```

### Buscar tarefa por ID
```bash
curl http://localhost:3001/tasks/{id}
```

### Atualizar status
```bash
curl -X PATCH http://localhost:3001/tasks/{id}/status \
  -H "Content-Type: application/json" \
  -d '{"status": "concluida"}'
```

### Deletar tarefa
```bash
curl -X DELETE http://localhost:3001/tasks/{id}
```

## Troubleshooting

### Erro de conexão com banco
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Verifique se o banco `tarefas_db` foi criado

### Erro de migration
- Certifique-se de que a extensão `uuid-ossp` está disponível no PostgreSQL
- Em desenvolvimento, o TypeORM pode sincronizar automaticamente (synchronize: true)

### Erro de porta já em uso
- Altere a porta no arquivo `.env`
- Ou pare outros processos usando a porta 3001

