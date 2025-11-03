# Backend - API de Gerenciamento de Tarefas

API RESTful desenvolvida em Node.js + TypeScript + Express para gerenciamento de tarefas, seguindo boas práticas de arquitetura e desenvolvimento.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Linguagem de programação
- **Express** - Framework web
- **TypeORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de objetos
- **Jest** - Framework de testes (configurado)

## 📁 Estrutura do Projeto

```
backend/
├── src/
│   ├── config/           # Configurações (banco de dados)
│   ├── controllers/      # Controllers (camada de apresentação)
│   ├── database/         # Migrations do banco de dados
│   ├── dto/              # Data Transfer Objects (validação)
│   ├── entities/         # Entidades do TypeORM
│   ├── errors/           # Classes de erro customizadas
│   ├── middleware/       # Middlewares (validação, tratamento de erros)
│   ├── repositories/     # Repositórios (camada de acesso a dados)
│   ├── routes/           # Rotas da API
│   ├── services/         # Services (camada de lógica de negócio)
│   ├── app.ts            # Configuração do Express
│   └── server.ts         # Ponto de entrada da aplicação
├── .env                  # Variáveis de ambiente (criar baseado no env.example)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Arquitetura

A aplicação segue os princípios de **Clean Architecture** e **SOLID**, com separação clara de responsabilidades:

- **Controllers**: Recebem requisições HTTP e retornam respostas
- **Services**: Contêm a lógica de negócio
- **Repositories**: Gerenciam o acesso aos dados
- **DTOs**: Validam os dados de entrada
- **Entities**: Representam as entidades do banco de dados
- **Middleware**: Tratam validações e erros de forma centralizada

## 📋 Endpoints da API

### POST /tasks
Cria uma nova tarefa.

**Request Body:**
```json
{
  "descricao": "Minha primeira tarefa"
}
```

**Response (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "descricao": "Minha primeira tarefa",
    "status": "pendente",
    "dataCriacao": "2024-01-01T00:00:00.000Z",
    "dataAtualizacao": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET /tasks
Lista todas as tarefas (ordenadas por data de criação, mais recentes primeiro).

**Response (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "descricao": "Minha primeira tarefa",
      "status": "pendente",
      "dataCriacao": "2024-01-01T00:00:00.000Z",
      "dataAtualizacao": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### GET /tasks/:id
Busca uma tarefa por ID.

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "descricao": "Minha primeira tarefa",
    "status": "pendente",
    "dataCriacao": "2024-01-01T00:00:00.000Z",
    "dataAtualizacao": "2024-01-01T00:00:00.000Z"
  }
}
```

**Response (404):**
```json
{
  "status": "error",
  "message": "Tarefa não encontrada"
}
```

### PATCH /tasks/:id/status
Atualiza o status de uma tarefa (pendente ou concluida).

**Request Body:**
```json
{
  "status": "concluida"
}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "descricao": "Minha primeira tarefa",
    "status": "concluida",
    "dataCriacao": "2024-01-01T00:00:00.000Z",
    "dataAtualizacao": "2024-01-01T00:00:00.000Z"
  }
}
```

### DELETE /tasks/:id
Remove uma tarefa.

**Response (204):** No content

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Instalar e configurar PostgreSQL

#### Se o PostgreSQL não estiver instalado (WSL/Linux):

**Opção 1 - Script automático:**
```bash
cd backend
./install-postgres.sh
```

**Opção 2 - Instalação manual:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo service postgresql start
```

#### Após instalação, crie o banco de dados:

1. Crie um banco de dados PostgreSQL:

```bash
sudo -u postgres psql
```

Depois execute:
```sql
CREATE DATABASE tarefas_db;
\q
```

2. Crie um arquivo `.env` na raiz da pasta `backend/` com as seguintes variáveis:

**Opção 1: Usar DATABASE_URL (recomendado)**
```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database - URL completa
DATABASE_URL=postgresql://postgres:senha@localhost:5432/tarefas_db
```

**Opção 2: Usar variáveis individuais**
```env
# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha_aqui
DB_NAME=tarefas_db
```

**Nota:** Se `DATABASE_URL` estiver definida, ela terá prioridade sobre as variáveis individuais.

### Passo 3: Executar migrations (opcional)

As migrations são executadas automaticamente em modo de desenvolvimento. Se preferir executá-las manualmente:

```bash
npm run migration:run
```

### Passo 4: Iniciar o servidor

**Modo desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:3001`

### Verificar se está funcionando

```bash
curl http://localhost:3001/health
```

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

Para executar com cobertura:

```bash
npm run test:coverage
```

## 📝 Validações

A API valida automaticamente os dados de entrada:

- **Criar tarefa**: A descrição é obrigatória e deve ter no máximo 500 caracteres
- **Atualizar status**: O status deve ser "pendente" ou "concluida"

## 🔒 Tratamento de Erros

A API retorna erros HTTP apropriados:

- **400**: Dados inválidos ou erro de validação
- **404**: Tarefa não encontrada
- **500**: Erro interno do servidor

Exemplo de resposta de erro:

```json
{
  "status": "error",
  "message": "Mensagem de erro",
  "errors": ["Lista de erros de validação"]
}
```

## 🎯 Decisões de Arquitetura

1. **TypeORM**: Escolhido por ser um ORM maduro e bem documentado, facilitando a criação de migrations e queries type-safe.

2. **Clean Architecture**: Separação clara entre camadas (Controllers → Services → Repositories) facilita manutenção e testes.

3. **DTOs com class-validator**: Validação automática e consistente dos dados de entrada, com mensagens de erro claras.

4. **Tratamento centralizado de erros**: Middleware de erro único facilita a manutenção e garante consistência nas respostas.

5. **TypeScript**: Type safety em todo o código, reduzindo erros em tempo de execução.

6. **UUID como ID**: IDs únicos e não sequenciais, melhorando a segurança da API.

## 🚀 Próximos Passos (Diferenciais)

- [ ] Implementar autenticação JWT
- [ ] Adicionar testes unitários e de integração
- [ ] Documentação com Swagger/OpenAPI
- [ ] Docker Compose para facilitar o setup
- [ ] CI/CD pipeline
- [ ] Deploy em cloud (AWS/GCP)

## 📚 Recursos Adicionais

- [Documentação do Express](https://expressjs.com/)
- [Documentação do TypeORM](https://typeorm.io/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)

---

**Nota**: Este é um projeto de desafio técnico. Em produção, considere adicionar:
- Rate limiting
- Logging estruturado
- Monitoramento e métricas
- Testes completos
- Documentação Swagger
- Docker e CI/CD

