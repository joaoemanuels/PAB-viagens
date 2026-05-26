# 🚐 PAB TRANSPORTE

<div align="center">

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-7B3FF2?style=for-the-badge&logo=zustand&logoColor=white)
![Leaflet](https://img.shields.io/badge/Maps-199900?style=for-the-badge&logo=leaflet&logoColor=white)

Sistema moderno de gestão de viagens, reservas e motoristas com simulação de localização em tempo real.

[🚀 Ver Demo](#instalação) • [📦 Estrutura](#estrutura-de-pastas) • [🧠 Funcionalidades](#funcionalidades) • [🛠️ Tecnologias](#tecnologias-utilizadas)

</div>

---

## 🎯 Sobre o Projeto

O **PAB Transporte** simula um sistema completo de gestão de viagens intermunicipais.

Permite gerenciar:

- Viagens
- Reservas de passageiros
- Motoristas
- Localização em tempo real

O foco é simular um SaaS real de transporte com dados dinâmicos e arquitetura escalável.

---

## 🧠 Funcionalidades

- 🧳 Gestão de Viagens
- 🎫 Sistema de Reservas
- 🚗 Gestão de Motoristas
- 📍 Localização em tempo real
- 🟢 Status dinâmico (agendada, em andamento, concluída)
- 🔄 Atualização de dados simulada (realtime mock)
- 🗺️ Visualização em mapa (Leaflet)
- ⚡ Estado global com Zustand
- 🎨 Interface moderna e responsiva

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 18
- Vite
- TypeScript
- Zustand
- CSS Modules
- Leaflet

### Desenvolvimento
- JavaScript ES6+
- Git / GitHub
- npm / pnpm

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── Dashboard/             # Componente principal do dashboard
│   │   ├── Dashboard.tsx
│   │   └── dashboard.module.css
│   ├── Sidebar/               # Navegação lateral
│   │   ├── Sidebar.tsx
│   │   └── sidebar.module.css
│   ├── Board/                 # Board Kanban
│   │   ├── Board.tsx
│   │   └── board.module.css
│   ├── TaskCard/              # Card individual de tarefa
│   │   ├── TaskCard.tsx
│   │   └── taskCard.module.css
│   ├── Modal/                 # Modal para criação/edição
│   │   ├── Modal.tsx
│   │   └── modal.module.css
│   └── Button/                # Componente Button reutilizável
│       ├── Button.tsx
│       └── button.module.css
│
├── pages/
│   ├── HomePage.tsx           # Página inicial
│   ├── DashboardPage.tsx      # Página do dashboard
│   ├── ProjectsPage.tsx       # Página de projetos
│   ├── NotFoundPage.tsx       # Página 404
│
├── store/
│   ├── taskStore.ts           # Store Zustand de tarefas
│   ├── projectStore.ts        # Store Zustand de projetos
│   └── uiStore.ts             # Store Zustand de UI (temas, estados)
│
├── routes/
│   └── routes.tsx             # Configuração de rotas
│
├── types/
│   ├── project.ts             # Tipos de projeto
│   ├── task.ts                # Tipos de tarefa
│   └── ui.ts                  # Tipos de UI
│
├── hooks/
│   ├── useTasks.ts            # Hook customizado para tarefas
│   ├── useProjects.ts         # Hook customizado para projetos
│   └── useLocalStorage.ts     # Hook para persistência local
│
├── layouts/
│   └── MainLayout.tsx         # Layout principal da aplicação
│
├── styles/
│   ├── global.css             # Estilos globais
│   ├── variables.css          # Variáveis CSS (cores, fonts, etc)
│   └── animations.css         # Animações globais
│
├── assets/
│   ├── icons/                 # Ícones SVG
│   ├── images/                # Imagens estáticas
│   └── fonts/                 # Fontes customizadas
│
├── utils/
│   ├── formatters.ts          # Funções de formatação
│   └── validators.ts          # Funções de validação
│
├── App.tsx                    # Componente raiz
└── main.tsx                   # Entry point da aplicação
```


---

## 🚐 Conceito do Sistema

O sistema é baseado em 4 entidades principais:

- 🧳 Viagens → núcleo do sistema
- 🎫 Reservas → passageiros vinculados às viagens
- 🚗 Motoristas → responsáveis pelas viagens
- 📍 Localização realtime → tracking em tempo real

---

## ⚙️ Fluxo de Dados

- Reserva → pertence a uma viagem
- Viagem → pertence a um motorista
- Motorista → possui localização dinâmica
- Localização → alimenta mapa em tempo real

---

## 📦 Mocks do Sistema

- viagens.mock → rotas e status
- reservas.mock → passageiros
- motoristas.mock → condutores
- localizacao.mock → tracking em tempo real

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/pab-transporte.git
cd pab-transporte

#### 2️⃣ Instale as dependências

```bash
npm install
# ou
pnpm install
```

#### 3️⃣ Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
pnpm dev
```

A aplicação abrirá automaticamente em `http://localhost:5173`

#### 4️⃣ Build para produção
```bash
npm run build
# ou
pnpm build
```

O build será gerado na pasta `dist/`

#### 5️⃣ Preview da build
```bash
npm run preview
# ou
pnpm preview
```

---

## 🗺️ Localização Realtime

### Simulação de movimento de motoristas:
- Atualização periódica
- Mudança de latitude e longitude
- Status online/offline
- Integração futura com mapa real

---

## 🎨 UI / UX
- Layout inspirado em sistemas de logística reais
- Foco em dados e clareza
- Interface SaaS moderna
- Componentização reutilizável
- Design responsivo

---

## 📈 Melhorias Futuras
- 🔐 Autenticação
- 🌐 Backend real (API)
- 📡 WebSockets (tempo real real)
- 📱 Mobile app
- 🧠 IA para rotas
- 📊 Dashboard analytics
- 💳 Pagamentos
- 📦 API completa

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**João Emanuel**

Desenvolvedor Full Stack em formação, apaixonado por React, TypeScript e design de produtos SaaS.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/joaoemanuels)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/joaoemanuels)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:jemanuel.pi@gmail.com)

---