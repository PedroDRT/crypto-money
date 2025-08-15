#!/bin/bash

# CryptoMoney Development Script
# Este script facilita o desenvolvimento da aplicação

echo "🚀 Iniciando CryptoMoney Development Environment..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js 18+ primeiro."
    exit 1
fi

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Dependências verificadas com sucesso!"

# Função para mostrar o menu
show_menu() {
    echo ""
    echo "📋 Menu de Desenvolvimento:"
    echo "1. 🚀 Iniciar ambiente completo (Docker)"
    echo "2. 🐳 Iniciar apenas banco de dados"
    echo "3. 📦 Instalar dependências"
    echo "4. 🔧 Executar em modo desenvolvimento"
    echo "5. 🏗️  Build para produção"
    echo "6. 🧪 Executar testes"
    echo "7. 🧹 Limpar ambiente"
    echo "8. 📊 Status dos serviços"
    echo "9. ❌ Sair"
    echo ""
    read -p "Escolha uma opção (1-9): " choice
}

# Função para iniciar ambiente completo
start_full_environment() {
    echo "🐳 Iniciando ambiente completo com Docker..."
    docker-compose up -d
    echo "✅ Ambiente iniciado! Acesse http://localhost:3000"
}

# Função para iniciar apenas banco de dados
start_database_only() {
    echo "🐘 Iniciando apenas PostgreSQL..."
    docker-compose up -d postgres redis
    echo "✅ Banco de dados iniciado!"
}

# Função para instalar dependências
install_dependencies() {
    echo "📦 Instalando dependências..."
    npm install
    echo "✅ Dependências instaladas!"
}

# Função para executar em modo desenvolvimento
run_development() {
    echo "🔧 Executando em modo desenvolvimento..."
    npm run dev
}

# Função para build de produção
build_production() {
    echo "🏗️  Build para produção..."
    npm run build
    echo "✅ Build concluído!"
}

# Função para executar testes
run_tests() {
    echo "🧪 Executando testes..."
    npm test
}

# Função para limpar ambiente
clean_environment() {
    echo "🧹 Limpando ambiente..."
    docker-compose down -v
    docker system prune -f
    rm -rf .next
    rm -rf node_modules
    echo "✅ Ambiente limpo!"
}

# Função para mostrar status dos serviços
show_status() {
    echo "📊 Status dos serviços:"
    docker-compose ps
}

# Loop principal do menu
while true; do
    show_menu

    case $choice in
        1)
            start_full_environment
            ;;
        2)
            start_database_only
            ;;
        3)
            install_dependencies
            ;;
        4)
            run_development
            ;;
        5)
            build_production
            ;;
        6)
            run_tests
            ;;
        7)
            clean_environment
            ;;
        8)
            show_status
            ;;
        9)
            echo "👋 Até logo!"
            exit 0
            ;;
        *)
            echo "❌ Opção inválida. Tente novamente."
            ;;
    esac

    echo ""
    read -p "Pressione Enter para continuar..."
done
