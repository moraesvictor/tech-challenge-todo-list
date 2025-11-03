#!/bin/bash

echo "🔧 Instalando PostgreSQL no WSL..."
echo ""

# Atualizar repositórios
echo "📦 Atualizando repositórios..."
sudo apt update

# Instalar PostgreSQL
echo "📦 Instalando PostgreSQL..."
sudo apt install -y postgresql postgresql-contrib

# Iniciar o serviço
echo "🚀 Iniciando PostgreSQL..."
sudo service postgresql start

# Criar banco de dados
echo "📊 Criando banco de dados..."
sudo -u postgres psql -c "CREATE DATABASE tarefas_db;" 2>/dev/null || echo "Banco já existe ou erro ao criar"

# Verificar se está rodando
echo ""
echo "✅ Verificando status do PostgreSQL..."
sudo service postgresql status

echo ""
echo "✅ PostgreSQL instalado e iniciado!"
echo ""
echo "📝 Próximos passos:"
echo "1. Configure o arquivo backend/.env com as credenciais"
echo "2. Se necessário, altere a senha do usuário postgres:"
echo "   sudo -u postgres psql"
echo "   ALTER USER postgres PASSWORD 'sua_senha';"
echo "   \\q"
echo ""
echo "3. Execute o backend:"
echo "   cd backend && npm run dev"

