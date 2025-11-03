# Frontend - Minhas Tarefas

Interface de usuário desenvolvida em Next.js 15 com Turbo Pack e arquitetura modular para gerenciamento de tarefas.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Type safety em todo o código
- **Tailwind CSS** - Estilização utilitária
- **Turbo Pack** - Build tool rápida (Next.js 15)
- **Axios** - Cliente HTTP para API

## 🏗️ Arquitetura Modular

A aplicação segue uma arquitetura modular baseada em módulos, similar ao padrão tech-challenge da FIAP:

```
frontend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── modules/                # Módulos da aplicação
│   └── tasks/             # Módulo de tarefas
│       ├── components/    # Componentes do módulo
│       ├── hooks/         # Hooks customizados
│       ├── services/      # Serviços de API
│       ├── types/         # Tipos TypeScript
│       └── index.ts       # Exports do módulo
├── shared/                # Recursos compartilhados
│   ├── components/        # Componentes reutilizáveis
│   ├── config/            # Configurações
│   ├── types/             # Tipos globais
│   └── utils/             # Funções utilitárias
└── package.json
```

### Estrutura de Módulos

Cada módulo (ex: `tasks`) contém:

- **components/**: Componentes React específicos do módulo
- **hooks/**: Hooks customizados para lógica de estado
- **services/**: Serviços para comunicação com API
- **types/**: Tipos TypeScript específicos do módulo
- **index.ts**: Exports centralizados

### Shared

Componentes e utilitários compartilhados entre módulos:

- **components/**: Loading, ErrorMessage, etc.
- **config/**: Configurações da API
- **utils/**: Formatação de datas, validações, etc.
- **types/**: Tipos globais da aplicação

## 📋 Funcionalidades

- ✅ Campo para adicionar nova tarefa
- ✅ Lista de tarefas exibindo descrição, status e data de criação
- ✅ Filtros "Todas", "Pendentes", "Concluídas"
- ✅ Ações de concluir e excluir tarefas
- ✅ Consumo da API desenvolvida no backend
- ✅ Componentização clara e semântica
- ✅ Acessibilidade (ARIA labels, roles)
- ✅ Responsividade

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js 18+ (recomendado 20+ para Next.js 15)
- Backend rodando em `http://localhost:3001`

### Passo 1: Instalar dependências

```bash
npm install
```

### Passo 2: Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz da pasta `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Passo 3: Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará rodando em `http://localhost:3000`

### Passo 4: Build para produção

```bash
npm run build
npm start
```

## 🎯 Módulos Implementados

### Módulo: Tasks

**Componentes:**
- `TaskForm`: Formulário para adicionar novas tarefas
- `TaskList`: Lista de tarefas com loading e empty states
- `TaskItem`: Item individual de tarefa com ações
- `TaskFilters`: Filtros para visualizar tarefas

**Hooks:**
- `useTasks`: Hook principal para gerenciar estado das tarefas

**Services:**
- `taskService`: Serviço para comunicação com API backend

## 📝 Decisões de Arquitetura

1. **Arquitetura Modular**: Separação clara por módulos facilita manutenção e escalabilidade
2. **Next.js App Router**: Utiliza a versão mais recente do App Router para melhor performance
3. **Turbo Pack**: Build tool rápida para desenvolvimento
4. **TypeScript**: Type safety em todo o código
5. **Tailwind CSS**: Estilização utilitária e responsiva
6. **Hooks Customizados**: Lógica de estado encapsulada em hooks reutilizáveis
7. **Componentização**: Componentes pequenos e focados em responsabilidade única

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

## 📚 Estrutura de Imports

A aplicação usa path aliases configurados no `tsconfig.json`:

```typescript
// Imports de módulos
import { TaskForm, TaskList } from '@modules/tasks';

// Imports de shared
import { Loading } from '@shared/components/Loading';
import { formatDate } from '@shared/utils/date';

// Imports relativos (App Router)
import './globals.css';
```

## 🔗 Integração com Backend

A aplicação consome a API desenvolvida no backend:

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/:id` - Buscar tarefa por ID
- `PATCH /tasks/:id/status` - Atualizar status
- `DELETE /tasks/:id` - Deletar tarefa

## 🎨 Estilização

- **Tailwind CSS**: Framework de utilitários CSS
- **Responsive Design**: Mobile-first approach
- **Acessibilidade**: ARIA labels, roles semânticos
- **Estados Visuais**: Loading, error, empty states

## 🚀 Próximos Passos (Diferenciais)

- [ ] Adicionar testes unitários e de integração
- [ ] Implementar autenticação JWT
- [ ] Adicionar animações e transições
- [ ] Otimizar performance com React.memo
- [ ] Adicionar PWA capabilities
- [ ] Implementar dark mode
- [ ] Adicionar paginação para grandes volumes de tarefas

## 📖 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Nota**: Este frontend foi desenvolvido seguindo boas práticas de componentização, semântica e acessibilidade, integrando-se com a API backend desenvolvida no desafio técnico.

