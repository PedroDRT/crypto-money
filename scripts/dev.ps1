# CryptoMoney Development Script (PowerShell)
# Este script facilita o desenvolvimento da aplicação no Windows

Write-Host "🚀 Iniciando CryptoMoney Development Environment..." -ForegroundColor Green

# Verificar se o Node.js está instalado
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js não está instalado. Por favor, instale o Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o Docker está instalado
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker não está instalado. Por favor, instale o Docker primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se o Docker Compose está instalado
if (-not (Get-Command docker-compose -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependências verificadas com sucesso!" -ForegroundColor Green

# Função para mostrar o menu
function Show-Menu {
    Write-Host ""
    Write-Host "📋 Menu de Desenvolvimento:" -ForegroundColor Cyan
    Write-Host "1. 🚀 Iniciar ambiente completo (Docker)"
    Write-Host "2. 🐳 Iniciar apenas banco de dados"
    Write-Host "3. 📦 Instalar dependências"
    Write-Host "4. 🔧 Executar em modo desenvolvimento"
    Write-Host "5. 🏗️  Build para produção"
    Write-Host "6. 🧪 Executar testes"
    Write-Host "7. 🧹 Limpar ambiente"
    Write-Host "8. 📊 Status dos serviços"
    Write-Host "9. ❌ Sair"
    Write-Host ""
    $choice = Read-Host "Escolha uma opção (1-9)"
    return $choice
}

# Função para iniciar ambiente completo
function Start-FullEnvironment {
    Write-Host "🐳 Iniciando ambiente completo com Docker..." -ForegroundColor Yellow
    docker-compose up -d
    Write-Host "✅ Ambiente iniciado! Acesse http://localhost:3000" -ForegroundColor Green
}

# Função para iniciar apenas banco de dados
function Start-DatabaseOnly {
    Write-Host "🐘 Iniciando apenas PostgreSQL..." -ForegroundColor Yellow
    docker-compose up -d postgres redis
    Write-Host "✅ Banco de dados iniciado!" -ForegroundColor Green
}

# Função para instalar dependências
function Install-Dependencies {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
}

# Função para executar em modo desenvolvimento
function Run-Development {
    Write-Host "🔧 Executando em modo desenvolvimento..." -ForegroundColor Yellow
    npm run dev
}

# Função para build de produção
function Build-Production {
    Write-Host "🏗️  Build para produção..." -ForegroundColor Yellow
    npm run build
    Write-Host "✅ Build concluído!" -ForegroundColor Green
}

# Função para executar testes
function Run-Tests {
    Write-Host "🧪 Executando testes..." -ForegroundColor Yellow
    npm test
}

# Função para limpar ambiente
function Clean-Environment {
    Write-Host "🧹 Limpando ambiente..." -ForegroundColor Yellow
    docker-compose down -v
    docker system prune -f
    if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
    if (Test-Path "node_modules") { Remove-Item -Recurse -Force "node_modules" }
    Write-Host "✅ Ambiente limpo!" -ForegroundColor Green
}

# Função para mostrar status dos serviços
function Show-Status {
    Write-Host "📊 Status dos serviços:" -ForegroundColor Yellow
    docker-compose ps
}

# Loop principal do menu
while ($true) {
    $choice = Show-Menu

    switch ($choice) {
        "1" { Start-FullEnvironment }
        "2" { Start-DatabaseOnly }
        "3" { Install-Dependencies }
        "4" { Run-Development }
        "5" { Build-Production }
        "6" { Run-Tests }
        "7" { Clean-Environment }
        "8" { Show-Status }
        "9" {
            Write-Host "👋 Até logo!" -ForegroundColor Green
            exit 0
        }
        default {
            Write-Host "❌ Opção inválida. Tente novamente." -ForegroundColor Red
        }
    }

    Write-Host ""
    Read-Host "Pressione Enter para continuar..."
}
