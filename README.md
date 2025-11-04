# Desafio Técnico - Full Stack (Node.js + React)

Aplicação Full Stack desenvolvida para gerenciamento de tarefas, com backend em Node.js + TypeScript + Express e frontend em React.

## 🏗️ Estrutura do Projeto

```
desafio-tecnico-node-react/
├── backend/          # API RESTful (Node.js + Express + TypeScript)
├── frontend/         # Interface React (em desenvolvimento)
└── README.md         # Este arquivo
```

## 🚀 Tecnologias

### Backend
- Node.js + TypeScript
- Express.js
- TypeORM + PostgreSQL
- class-validator

### Frontend
- Next.js 15 (App Router + Turbo Pack)
- TypeScript
- Tailwind CSS
- Arquitetura Modular

## 📋 Funcionalidades

- ✅ CRUD completo de tarefas
- ✅ Validações de entrada
- ✅ Tratamento de erros HTTP apropriado
- ✅ Persistência em banco relacional (PostgreSQL)
- ✅ Arquitetura Clean Architecture + SOLID

## 🛠️ Setup Rápido

### Backend

```bash
cd backend
npm install
cp env.example .env
# Configure o .env com suas credenciais do PostgreSQL
npm run dev
```

A API estará rodando em `http://localhost:3001`

Veja [backend/README.md](./backend/README.md) para mais detalhes.

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure o .env.local com a URL da API (se necessário)
npm run dev
```

A aplicação estará rodando em `http://localhost:3000`

Veja [frontend/README.md](./frontend/README.md) para mais detalhes.

## 📚 Documentação

- [Backend README](./backend/README.md) - Documentação completa da API
- [Backend SETUP](./backend/SETUP.md) - Guia rápido de setup do backend
- [Frontend README](./frontend/README.md) - Documentação completa do frontend
- [Frontend SETUP](./frontend/SETUP.md) - Guia rápido de setup do frontend

## 🎯 Endpoints da API

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/:id` - Buscar tarefa por ID
- `PATCH /tasks/:id/status` - Atualizar status
- `DELETE /tasks/:id` - Deletar tarefa

## 🧪 Testes

### Backend

```bash
cd backend
npm test
```

### Frontend

```bash
cd frontend
npm test
```

Para mais detalhes sobre a implementação dos testes no frontend, veja a [PR #4 - Implementação de testes unitários no frontend](https://github.com/moraesvictor/tech-challenge-todo-list/pull/4).

## 📝 Decisões de Arquitetura

### Separação Backend/Frontend

A separação em pastas `backend/` e `frontend/` foi escolhida porque:

✅ **Facilita desenvolvimento independente** - Cada parte pode ser desenvolvida separadamente  
✅ **Organização clara** - Estrutura mais limpa e fácil de navegar  
✅ **Padrão comum** - Estrutura amplamente usada em projetos Full Stack  
✅ **Escalabilidade** - Facilita futura separação em repositórios distintos se necessário  
✅ **CI/CD independente** - Cada parte pode ter seu próprio pipeline  

### Alternativas consideradas

- **Monorepo com workspaces** (npm/yarn workspaces) - Mais complexo para um desafio técnico
- **Repositórios separados** - Mais comum em projetos grandes, mas para desafio técnico um repositório único é melhor

## 👤 Autor

Desenvolvido como parte do desafio técnico Full Stack.
