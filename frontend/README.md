# Frontend - Minhas Tarefas

Interface de usuário desenvolvida em Next.js 15 com Turbo Pack e arquitetura modular para gerenciamento de tarefas.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Type safety em todo o código
- **Tailwind CSS** - Estilização utilitária
- **Turbo Pack** - Build tool rápida (Next.js 15)
- **Axios** - Cliente HTTP para API
- **clsx** - Biblioteca para gerenciar classes CSS condicionais
- **React Context API** - Sistema de toast para notificações

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

- **components/**: 
  - `Button` - Componente de botão reutilizável com variantes (primary, secondary, danger, ghost)
  - `Input` - Componente de input com suporte a erro e label
  - `Loading` - Componente de loading
  - `ErrorMessage` - Componente de mensagem de erro
  - `Toast` - Sistema completo de notificações toast com Context API
- **config/**: Configurações da API
- **utils/**: Formatação de datas, validações, etc.
- **types/**: Tipos globais da aplicação

### Estrutura de Componentes

Os componentes seguem o padrão `NomeDaPasta/NomeDaPasta.tsx + index.ts`:

```
Componente/
├── Componente.tsx    # Componente principal
└── index.ts          # Export do componente
```

Isso torna o código mais legível e organizado.

## 📋 Funcionalidades

- ✅ Campo para adicionar nova tarefa
- ✅ Lista de tarefas exibindo descrição, status e data de criação
- ✅ Filtros "Todas", "Pendentes", "Concluídas"
- ✅ Ações de concluir e excluir tarefas
- ✅ Consumo da API desenvolvida no backend
- ✅ Sistema de Toast para notificações (sucesso, erro, aviso, informação)
- ✅ Componentes reutilizáveis (Button, Input)
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
- `TaskContainer`: Container principal que abstrai toda a lógica do módulo
- `TaskForm`: Formulário para adicionar novas tarefas
- `TaskList`: Lista de tarefas com loading e empty states
- `TaskItem`: Item individual de tarefa com ações
- `TaskFilters`: Filtros para visualizar tarefas

**Hooks:**
- `useTasks`: Hook principal para gerenciar estado das tarefas com integração de toast

**Services:**
- `taskService`: Serviço para comunicação com API backend

### Componentes Reutilizáveis (Shared)

**Button:**
- Variantes: `primary`, `secondary`, `danger`, `ghost`
- Suporte a loading state
- Estados disabled e focus

**Input:**
- Suporte a label e erro
- Validação visual
- Integração com aria-labels

**Toast:**
- Sistema completo de notificações
- Tipos: `success`, `error`, `warning`, `info`
- Posicionamento configurável (top/bottom + left/right/center)
- Auto-dismiss após 3 segundos
- Animações suaves

## 📝 Decisões de Arquitetura

1. **Arquitetura Modular**: Separação clara por módulos facilita manutenção e escalabilidade
2. **Next.js App Router**: Utiliza a versão mais recente do App Router para melhor performance
3. **Turbo Pack**: Build tool rápida para desenvolvimento
4. **TypeScript**: Type safety em todo o código
5. **Tailwind CSS**: Estilização utilitária e responsiva
6. **clsx**: Biblioteca para gerenciar classes CSS condicionais de forma legível
7. **React Context API**: Sistema de toast para notificações globais
8. **Hooks Customizados**: Lógica de estado encapsulada em hooks reutilizáveis
9. **Componentização**: Componentes pequenos e focados em responsabilidade única
10. **Estrutura de Pastas**: Padrão `NomeDaPasta/NomeDaPasta.tsx + index.ts` para melhor legibilidade
11. **Componentes Reutilizáveis**: Button e Input compartilhados para consistência visual
12. **TaskContainer**: Abstração da lógica do módulo tasks para componente container

## 🎯 Decisões Técnicas do Frontend

### Testes Unitários

**Stack de Testes:**
- **Jest 29.7.0** - Framework de testes principal
- **React Testing Library 14.1.2** - Biblioteca para testes de componentes React
- **@testing-library/user-event 14.5.1** - Simulação de interações do usuário
- **@testing-library/jest-dom 6.1.5** - Matchers customizados para DOM
- **ts-jest 29.1.1** - Suporte TypeScript para Jest
- **MSW 2.0.0** - Preparado para mocks de API quando necessário

**Decisões de Implementação:**

1. **Custom Render Functions**: Criamos funções `render` e `renderHook` customizadas que envolvem automaticamente os componentes com `ModalProvider` e `ToastProvider`, garantindo que todos os testes tenham acesso aos contextos necessários sem repetição de código.

2. **Factories de Dados**: Implementamos factories (`taskFactory.ts`) para criar dados de teste consistentes e reutilizáveis, seguindo o padrão Factory Pattern para facilitar a manutenção e evolução dos testes.

3. **Uso de `act()`**: Envolvemos todas as atualizações assíncronas de estado com `act()` para evitar warnings do React e garantir que os testes reflitam o comportamento real da aplicação.

4. **Queries Acessíveis**: Priorizamos queries acessíveis (`getByRole`, `getByLabelText`, `getByPlaceholderText`) em vez de queries por texto ou classe CSS, promovendo testes que também verificam acessibilidade.

5. **Estrutura de Testes**: Seguimos o padrão `describe/it` com `beforeEach` para limpeza de mocks, garantindo isolamento entre testes.

6. **Path Aliases**: Configuramos aliases `@test-utils` para facilitar imports e manter a estrutura de testes organizada.

**Cobertura:**
- 12 arquivos de teste cobrindo componentes, hooks e utilitários
- 81 testes passando
- Cobertura de renderização, interações, estados e acessibilidade

Para mais detalhes sobre a implementação dos testes, veja a [PR #4](https://github.com/moraesvictor/tech-challenge-todo-list/pull/4).

### Sistema de Toast

**Decisão**: Implementamos um sistema de toast usando React Context API em vez de bibliotecas externas como `react-toastify` ou `react-hot-toast` porque:

1. **Controle total**: Podemos customizar completamente o comportamento e estilização
2. **Sem dependências extras**: Reduz o tamanho do bundle
3. **Integração natural**: Se integra perfeitamente com a arquitetura modular existente
4. **Aprendizado**: Demonstra conhecimento de Context API e gerenciamento de estado global

### Componentização

**Decisão**: Estrutura `NomeDaPasta/NomeDaPasta.tsx + index.ts` em vez de `NomeDaPasta.tsx` direto porque:

1. **Organização**: Facilita a adição de sub-componentes e arquivos relacionados
2. **Escalabilidade**: Permite evoluir o componente sem refatorar imports
3. **Legibilidade**: Torna explícito qual componente está sendo importado
4. **Padrão comum**: Alinha com práticas modernas de organização de componentes React

### TaskContainer

**Decisão**: Criamos um componente `TaskContainer` que abstrai toda a lógica do módulo de tarefas porque:

1. **Separação de responsabilidades**: A página (`app/page.tsx`) fica limpa e focada apenas em composição
2. **Reutilização**: O container pode ser usado em diferentes contextos se necessário
3. **Testabilidade**: Facilita testes isolados da lógica do módulo
4. **Manutenibilidade**: Centraliza toda a lógica relacionada a tarefas em um único lugar

### clsx para Classes CSS

**Decisão**: Usamos `clsx` em vez de template literals para classes condicionais porque:

1. **Legibilidade**: Código mais limpo e fácil de entender
2. **Manutenibilidade**: Facilita adicionar/remover classes condicionais
3. **Performance**: Biblioteca otimizada para gerenciar classes
4. **Padrão**: Amplamente adotado na comunidade React

## 🧪 Testes

A aplicação possui uma suíte completa de testes unitários implementada. Para executar:

```bash
# Executar todos os testes
npm test

# Modo watch (desenvolvimento)
npm run test:watch

# Com cobertura de código
npm run test:coverage
```

### Estrutura de Testes

Os testes seguem os padrões estabelecidos:
- **Custom Render Functions**: Componentes são renderizados com providers necessários automaticamente
- **Factories**: Dados de teste criados através de factories para consistência
- **Isolamento**: Cada teste é independente com limpeza de mocks entre execuções
- **Acessibilidade**: Testes verificam acessibilidade através de queries semânticas

Para mais detalhes sobre a implementação dos testes, veja a [PR #4](https://github.com/moraesvictor/tech-challenge-todo-list/pull/4).

## 📚 Estrutura de Imports

A aplicação usa path aliases configurados no `tsconfig.json`:

```typescript
// Imports de módulos
import { TaskForm, TaskList, TaskContainer } from '@modules/tasks';

// Imports de shared
import { Button, Input, Loading } from '@shared/components';
import { useToastMethods } from '@shared/components/Toast';
import { formatDate } from '@shared/utils/date';

// Imports relativos (App Router)
import './globals.css';
```

## 🎨 Sistema de Toast

O sistema de toast usa React Context API para notificações globais:

### Uso Básico

```typescript
import { useToastMethods } from '@shared/components/Toast';

const toast = useToastMethods();

// Exemplos:
toast.success('Tarefa criada com sucesso!');
toast.error('Erro ao criar tarefa');
toast.warning('Atenção!');
toast.info('Informação');
```

### Características

- **Tipos**: `success`, `error`, `warning`, `info`
- **Posicionamento**: Configurável (padrão: `bottom-right`)
- **Auto-dismiss**: Remove automaticamente após 3 segundos
- **Animações**: Animação `fade-in-up` para entrada suave
- **Memoização**: Otimizado para evitar re-renderizações desnecessárias

### Integração

O `ToastProvider` está configurado no `app/layout.tsx` e envolve toda a aplicação, permitindo usar toasts de qualquer componente.

## 🔗 Integração com Backend

A aplicação consome a API desenvolvida no backend:

- `POST /tasks` - Criar tarefa
- `GET /tasks` - Listar todas as tarefas
- `GET /tasks/:id` - Buscar tarefa por ID
- `PATCH /tasks/:id/status` - Atualizar status
- `DELETE /tasks/:id` - Deletar tarefa

## 🎨 Estilização

- **Tailwind CSS**: Framework de utilitários CSS
- **clsx**: Biblioteca para gerenciar classes CSS condicionais de forma legível
- **Responsive Design**: Mobile-first approach
- **Acessibilidade**: ARIA labels, roles semânticos
- **Estados Visuais**: Loading, error, empty states
- **Animações**: Animações CSS customizadas para toasts e transições

### Exemplo de uso do clsx

```typescript
import clsx from 'clsx';

// Antes (template literals)
className={`${baseStyles} ${variantStyles[variant]} ${className}`}

// Depois (clsx)
className={clsx(
  'px-4 py-2 rounded-lg',
  {
    'bg-blue-600 text-white': variant === 'primary',
    'bg-gray-200 text-gray-700': variant === 'secondary',
  },
  className
)}
```

## 🚀 Próximos Passos (Diferenciais)

- [x] Sistema de Toast para notificações
- [x] Componentes reutilizáveis (Button, Input)
- [x] clsx para classes CSS condicionais
- [x] TaskContainer para abstrair lógica
- [x] Estrutura de pastas organizada (NomeDaPasta/NomeDaPasta.tsx)
- [ ] Adicionar testes unitários e de integração
- [ ] Implementar autenticação JWT
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

