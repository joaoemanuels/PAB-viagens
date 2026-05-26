# 🏗️ PAB - Architecture Overview (Viagens)

## 🎯 Visão geral

O projeto PAB (Transporte/Viagens) é um sistema de gerenciamento de viagens, passageiros e perfis, com foco em organização de rotas, controle de usuários e visualização de informações operacionais.

---

## 🧠 Objetivo do sistema

Permitir que usuários:
- Visualizem viagens disponíveis
- Acompanhem informações de passageiros
- Gerenciem perfil de usuário
- Tenham uma visão clara de rotas e datas de viagem

---

## ⚙️ Stack utilizada

- React (JSX)
- Vite
- Zustand (estado global)
- Axios (requisições HTTP)
- Leaflet (mapas e rotas)
- date-fns (manipulação de datas)
- Supabase (backend as a service)

---

## 📁 Estrutura de pastas

src/
 ├── components/   # Componentes reutilizáveis (cards, botões, sidebar)
 ├── pages/        # Páginas principais
 │     ├── Viagens/
 │     ├── Passageiros/
 │     ├── Perfil/
 ├── services/     # Integração com API (Axios / Supabase)
 ├── store/        # Estado global (Zustand)
 ├── hooks/        # Hooks personalizados
 ├── utils/        # Funções auxiliares (datas, formatadores)
 ├── styles/       # CSS global e variáveis
 ├── assets/       # Imagens e ícones

---

## 🔄 Fluxo da aplicação

1. Usuário acessa o sistema
2. Autenticação via Supabase
3. Dados são carregados via API (Axios)
4. Zustand gerencia estado global (usuário, viagens, passageiros)
5. UI renderiza:
   - Lista de viagens
   - Informações de passageiros
   - Perfis
   - Mapas (Leaflet)

---

## 🗺️ Integrações externas

### Leaflet
Responsável por:
- Exibir mapas
- Marcar origem e destino das viagens
- Visualização de rotas

---

### Supabase
Responsável por:
- Autenticação de usuários
- Armazenamento de viagens
- Armazenamento de passageiros
- Dados de perfil

---

## 📅 Manipulação de datas (date-fns)

Utilizado para:
- Formatar datas de viagens
- Calcular tempo restante até saída
- Definir status da viagem (hoje, futura, atrasada)

---

## 🧠 Regras de arquitetura

- Componentes não fazem requisições diretamente
- Toda comunicação com API ocorre via `services/`
- Estado global centralizado no Zustand
- Lógica de data isolada em `utils/`
- Reutilização de componentes é obrigatória