# CryptoMoney - Plataforma de Criptomoedas

## 🎓 **Projeto do Curso Técnico - Senac Jundiaí**

Este projeto foi desenvolvido como parte do curso técnico do Senac Jundiaí, demonstrando a aplicação de tecnologias modernas de desenvolvimento web e mobile.

---

## 🚀 **Sobre o Projeto**

CryptoMoney é uma plataforma moderna e completa para gerenciamento de criptomoedas, desenvolvida com as mais recentes tecnologias do mercado. O projeto demonstra competências em desenvolvimento full-stack, design responsivo e integração com APIs externas.

## ✨ **Principais Funcionalidades**

### **Frontend Moderno**
- **Dashboard interativo** com estatísticas em tempo real
- **Sistema de carteira digital** com histórico de transações
- **Market de criptomoedas** com dados atualizados via API
- **Configurações personalizáveis** do usuário
- **Interface responsiva** para desktop e mobile

### **Tecnologias Implementadas**
- **Next.js 15** com App Router
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização moderna
- **Framer Motion** para animações fluidas
- **React Hook Form** para formulários
- **Zustand** para gerenciamento de estado

### **APIs e Integrações**
- **CoinGecko API** para dados de criptomoedas em tempo real
- **Sistema de autenticação** com JWT
- **Notificações** com React Hot Toast
- **Atualizações automáticas** de preços

## 🛠️ **Tecnologias Utilizadas**

### **Frontend**
- **Next.js 15.4.6** - Framework React com SSR/SSG
- **React 18** - Biblioteca de interface
- **TypeScript 5.3** - Tipagem estática
- **Tailwind CSS 3.3** - Framework CSS utilitário
- **Framer Motion 10.16** - Animações e transições
- **Lucide React 0.294** - Ícones modernos

### **Backend (Planejado)**
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **Nodemailer** - Envio de e-mails
- **Twilio** - Notificações SMS

### **Ferramentas de Desenvolvimento**
- **ESLint** - Linting de código
- **Docker** - Containerização
- **Git** - Controle de versão
- **VSCode** - Editor de código

## 📁 **Estrutura do Projeto**

```
CryptoMoney30/
├── app/                    # App Router do Next.js
│   ├── api/               # Rotas da API
│   ├── dashboard/         # Página do dashboard
│   ├── login/            # Página de login
│   ├── market/           # Página do market
│   ├── register/         # Página de registro
│   ├── settings/         # Página de configurações
│   ├── wallet/           # Página da carteira
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes reutilizáveis
│   ├── crypto/           # Componentes de criptomoedas
│   ├── layout/           # Componentes de layout
│   ├── providers/        # Providers do React
│   └── ui/               # Componentes de interface
├── hooks/                 # Hooks customizados
├── scripts/               # Scripts de desenvolvimento
├── .vscode/              # Configurações do VSCode
├── docker-compose.yml    # Configuração Docker
└── README.md             # Este arquivo
```

## 🚀 **Como Executar**

### **Pré-requisitos**
- Node.js 18+ instalado
- npm ou yarn
- Git

### **Instalação**
```bash
# Clone o repositório
git clone [URL_DO_SEU_REPOSITORIO]
cd CryptoMoney30

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local
# Edite o arquivo .env.local com suas configurações

# Execute em modo de desenvolvimento
npm run dev
```

### **Com Docker (Recomendado)**
```bash
# Inicie todos os serviços
docker-compose up -d

# Acesse a aplicação
# http://localhost:3000
```

## 📱 **Funcionalidades Implementadas**

### **✅ Sistema de Autenticação**
- Registro de usuários
- Login/logout
- Proteção de rotas
- Contexto de autenticação

### **✅ Dashboard Interativo**
- Estatísticas em tempo real
- Visão geral do portfólio
- Gráficos de performance
- Indicadores de mercado

### **✅ Carteira Digital**
- Gerenciamento de ativos
- Histórico de transações
- Depósitos e saques
- Balanço em tempo real

### **✅ Market de Criptomoedas**
- Lista de 100+ criptomoedas
- Dados em tempo real via API
- Busca e filtros avançados
- Ordenação por múltiplos critérios

### **✅ Configurações do Usuário**
- Perfil personalizável
- Preferências de notificação
- Configurações de segurança
- Métodos de pagamento

## 🔮 **Próximos Passos Recomendados**

### **Backend e Banco de Dados**
- Implementar API Node.js/Express
- Configurar PostgreSQL
- Sistema de autenticação JWT real
- Validação de dados robusta

### **Funcionalidades Avançadas**
- Sistema de trading (compra/venda)
- Alertas de preço em tempo real
- Notificações push
- Relatórios e análises

### **Mobile e PWA**
- Aplicativo mobile nativo
- Progressive Web App (PWA)
- Funcionalidades offline
- Sincronização em tempo real

## 🧪 **Testes**

```bash
# Execute os testes
npm test

# Teste de linting
npm run lint

# Verificação de tipos TypeScript
npm run type-check
```

## 🚀 **Build e Deploy**

```bash
# Build para produção
npm run build

# Iniciar em modo produção
npm start

# Deploy com Docker
docker build -t cryptomoney .
docker run -p 3000:3000 cryptomoney
```

## 🤝 **Como Contribuir**

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 **Licença**

Este projeto foi desenvolvido como parte do curso técnico do Senac Jundiaí e está sob licença educacional.

## 👨‍💻 **Autores**

- **Pedro Dutra** - Desenvolvimento Frontend e Backend
- **Guilherme Lopes** - Design e UX/UI

---

## 🎯 **Objetivos Educacionais**

Este projeto demonstra competências em:

- **Desenvolvimento Full-Stack** com tecnologias modernas
- **Arquitetura de aplicações** web responsivas
- **Integração com APIs** externas
- **Gerenciamento de estado** em aplicações React
- **Design responsivo** e experiência do usuário
- **Versionamento** com Git
- **Containerização** com Docker
- **Boas práticas** de desenvolvimento

---

**Desenvolvido com ❤️ para o curso técnico do Senac Jundiaí**

O projeto estará disponível em `http://localhost:3000`
