# Setup Rápido - Frontend

## Passos Rápidos

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz da pasta `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Certifique-se de que o backend está rodando

O backend deve estar rodando em `http://localhost:3001`

### 4. Iniciar servidor de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## Estrutura do Projeto

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
│       └── types/         # Tipos TypeScript
├── shared/                # Recursos compartilhados
│   ├── components/        # Componentes reutilizáveis
│   ├── config/            # Configurações
│   ├── types/             # Tipos globais
│   └── utils/             # Funções utilitárias
└── package.json
```

## Troubleshooting

### Erro de módulos não encontrados
- Execute `npm install` para instalar as dependências

### Erro de conexão com API
- Verifique se o backend está rodando em `http://localhost:3001`
- Confirme a variável `NEXT_PUBLIC_API_URL` no `.env.local`

### Erro de porta já em uso
- Certifique-se de que a porta 3000 está livre
- Ou pare outros processos usando a porta 3000

### Erros de TypeScript
- Execute `npm install` para instalar os tipos
- Reinicie o servidor TypeScript no VS Code

