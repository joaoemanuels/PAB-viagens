# 🚌 PAB Viagens - Roadmap Completo

> Um roadmap prático e executável para entregar um MVP profissional de plataforma de transporte intermunicipal.

---

## 📊 Visão Geral das Fases

```
Fase 0: Preparação
  ↓
Fase 1: Backend & Database
  ↓
Fase 2: Frontend Básico
  ↓
Fase 3: Funcionalidades Core
  ↓
Fase 4: Tracking em Tempo Real
  ↓
Fase 5: Pagamentos & Integração
  ↓
Fase 6: Painel do Motorista
  ↓
Fase 7: Testes & Otimização
  ↓
Fase 8: Deploy & Go-Live
```

---

# FASE 0: PREPARAÇÃO DO PROJETO
## ⚙️ Configuração Inicial

### Dependências Core Instaladas
- [x] React Router v6
  ```bash
  npm install react-router-dom
  ```
- [x] Zustand (state management)
  ```bash
  npm install zustand
  ```
- [x] Supabase Client
  ```bash
  npm install @supabase/supabase-js
  ```
- [x] Leaflet (mapas)
  ```bash
  npm install leaflet react-leaflet
  ```
- [x] HTTP Client (Axios)
  ```bash
  npm install axios
  ```
- [x] UI/Utilidades
  ```bash
  npm install clsx date-fns
  ```
- [ ] Validação de Formulários
  ```bash
  npm install zod react-hook-form @hookform/resolvers
  ```

### Estrutura de Pastas Criada
```
pab-viagens/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Loading.jsx
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   └── DriverLayout.jsx
│   │   ├── passenger/
│   │   ├── driver/
│   │   └── map/
│   ├── pages/
│   │   ├── PassengerDashboard.jsx
│   │   ├── DriverDashboard.jsx
│   │   ├── Booking.jsx
│   │   ├── TrackTrip.jsx
│   │   ├── Login.jsx
│   │   └── 404.jsx
│   ├── services/
│   │   ├── supabase.js
│   │   ├── auth.js
│   │   ├── trips.js
│   │   ├── bookings.js
│   │   └── payment.js
│   ├── store/
│   │   ├── authStore.js
│   │   ├── tripStore.js
│   │   ├── bookingStore.js
│   │   └── locationStore.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validation.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useLocation.js
│   │   └── useTrip.js
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── favicon.ico
├── .env.example
├── vite.config.js
├── package.json
└── README.md
```

- [x] Criar arquivo `.env` com variáveis necessárias:
  ```
  VITE_SUPABASE_URL=
  VITE_SUPABASE_ANON_KEY=
  VITE_API_BASE_URL=
  VITE_MAPBOX_TOKEN=
  ```

### Configurar Vite
- [x] Criar `vite.config.js` com:
  - Alias para `@/` apontando para `src/`
  - Configurações de build otimizadas
  - CORS para API
  ```javascript
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  import path from 'path'

  export default defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  })
  ```

### Configuração CSS Global
- [x] Criar `variables.css` com design tokens:
  ```css
  :root {
    /* Cores principais */
    --primary: #1a73e8;
    --primary-light: #e8f0fe;
    --secondary: #34a853;
    --danger: #d33b27;
    --warning: #fbbc04;
    --neutral-bg: #f8f9fa;
    --neutral-border: #dadce0;
    --text-primary: #202124;
    --text-secondary: #5f6368;
    
    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    
    /* Tipografia */
    --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    --font-size-sm: 12px;
    --font-size-base: 14px;
    --font-size-lg: 16px;
    --font-size-xl: 18px;
    --font-size-2xl: 24px;
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    
    /* Border Radius */
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 12px;
  }
  ```

- [x] Criar `global.css` com reset e estilos base:
  ```css
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: var(--font-family);
    background-color: var(--neutral-bg);
    color: var(--text-primary);
    line-height: 1.5;
  }

  html, body {
    height: 100%;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  input {
    font-size: 16px;
  }
  ```

### Conta Supabase Criada
- [x] Acessar [supabase.com](https://supabase.com)
- [x] Criar novo projeto
  - [x] Configurar região mais próxima (América do Sul)
  - [x] Configurar senha segura do PostgreSQL
- [x] Obter credenciais (`SUPABASE_URL` e `PUBLISHABLE_KEY`)
- [x] Habilitar autenticação por email
- [x] Copiar variáveis para `.env.local`

### Documentação Base
- [x] Criar `README.md` com:
  - Descrição do projeto
  - Como instalar
  - Como rodar localmente
  - Estrutura de pastas
  - Contribuição
- [x] Criar `ARCHITECTURE.md` com diagrama de arquitetura
- [x] Criar `API.md` com endpoints esperados

---

# FASE 1: BACKEND & DATABASE
## 🗄️ Configuração do Supabase (3-5 dias)

### Criação de Tabelas

#### 1. Tabela `users` (Passageiros e Motoristas)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id UUID REFERENCES auth.users ON DELETE CASCADE,
    role TEXT CHECK (role IN ('passenger', 'driver')),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    document_id TEXT UNIQUE,
    birth_date DATE,
    gender TEXT,
    address TEXT,
    address_complement TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_users_auth_id ON users(auth_id);`
  - `CREATE INDEX idx_users_email ON users(email);`
  - `CREATE INDEX idx_users_role ON users(role);`

#### 2. Tabela `routes` (Rotas Fixas)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE routes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    origin_city TEXT NOT NULL,
    destination_city TEXT NOT NULL,
    origin_lat DECIMAL(10, 8),
    origin_lng DECIMAL(11, 8),
    destination_lat DECIMAL(10, 8),
    destination_lng DECIMAL(11, 8),
    total_seats INTEGER NOT NULL,
    price_per_seat DECIMAL(10, 2) NOT NULL,
    estimated_duration_minutes INTEGER,
    vehicle_plate TEXT,
    vehicle_model TEXT,
    vehicle_color TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_routes_driver_id ON routes(driver_id);`
  - `CREATE INDEX idx_routes_origin_destination ON routes(origin_city, destination_city);`

#### 3. Tabela `schedules` (Horários Recorrentes)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_schedules_route_id ON schedules(route_id);`
  - `CREATE INDEX idx_schedules_day_time ON schedules(day_of_week, departure_time);`

#### 4. Tabela `trips` (Viagens Instanciadas)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE trips (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    route_id UUID NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
    departure_date DATE NOT NULL,
    departure_time TIME NOT NULL,
    arrival_time TIME NOT NULL,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    driver_current_lat DECIMAL(10, 8),
    driver_current_lng DECIMAL(11, 8),
    driver_last_update TIMESTAMP,
    estimated_arrival TIMESTAMP,
    actual_arrival TIMESTAMP,
    available_seats INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_trips_route_id ON trips(route_id);`
  - `CREATE INDEX idx_trips_departure_date ON trips(departure_date);`
  - `CREATE INDEX idx_trips_status ON trips(status);`

#### 5. Tabela `bookings` (Reservas)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    passenger_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    seat_number INTEGER NOT NULL,
    passenger_name TEXT NOT NULL,
    passenger_phone TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'checked_in', 'cancelled')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT,
    payment_id TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_bookings_trip_id ON bookings(trip_id);`
  - `CREATE INDEX idx_bookings_passenger_id ON bookings(passenger_id);`
  - `CREATE INDEX idx_bookings_status ON bookings(status);`
  - `CREATE UNIQUE INDEX idx_bookings_trip_seat ON bookings(trip_id, seat_number);`

#### 6. Tabela `payments` (Registro de Pagamentos)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    method TEXT NOT NULL CHECK (method IN ('pix', 'qr_code', 'cash', 'whatsapp')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    external_id TEXT,
    pix_code TEXT,
    qr_code_url TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_payments_booking_id ON payments(booking_id);`
  - `CREATE INDEX idx_payments_status ON payments(status);`

#### 7. Tabela `reviews` (Avaliações)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_reviews_trip_id ON reviews(trip_id);`
  - `CREATE INDEX idx_reviews_reviewer_id ON reviews(reviewer_id);`

#### 8. Tabela `driver_locations` (Histórico de Localizações)
- [x] Criar tabela com campos:
  ```sql
  CREATE TABLE driver_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trip_id UUID NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    accuracy DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT NOW()
  );
  ```
- [x] Criar índices:
  - `CREATE INDEX idx_locations_trip_id ON driver_locations(trip_id);`
  - `CREATE INDEX idx_locations_timestamp ON driver_locations(timestamp);`

### RLS (Row Level Security) Policies

- [x] Habilitar RLS em todas as tabelas:
  ```sql
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
  ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
  ALTER TABLE trips ENABLE ROW LEVEL SECURITY;
  ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
  ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
  ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
  ALTER TABLE driver_locations ENABLE ROW LEVEL SECURITY;
  ```

- [x] Criar políticas básicas de segurança:
  - Users podem ver seu próprio perfil
  - Passageiros podem ver rotas públicas
  - Motorista pode ver suas próprias rotas
  - Passageiros podem ver suas próprias reservas
  - etc.

### Realtime Setup
- [x] Ativar Realtime para tabelas:
  - [x] `trips` (para tracking)
  - [x] `bookings` (para confirmações)
  - [x] `driver_locations` (para posição em tempo real)

### Serviços Supabase Criados

#### Service: Auth.js
- [ ] Criar arquivo `src/services/auth.js`:
  ```javascript
  import { supabase } from './supabase'

  export const authService = {
    signUp: async (email, password, userType) => {
      // Lógica de cadastro
    },
    signIn: async (email, password) => {
      // Lógica de login
    },
    signOut: async () => {
      // Lógica de logout
    },
    getCurrentUser: async () => {
      // Retorna usuário atual
    },
    updateProfile: async (userId, data) => {
      // Atualiza perfil
    }
  }
  ```

#### Service: Trips.js
- [ ] Criar arquivo `src/services/trips.js`:
  ```javascript
  export const tripService = {
    createTrip: async (routeId, scheduleId, departureDate) => {},
    getTripsByDate: async (departureDate) => {},
    getTripDetails: async (tripId) => {},
    updateTripStatus: async (tripId, status) => {},
    updateDriverLocation: async (tripId, lat, lng) => {},
    subscribeToTrip: (tripId, callback) => {},
    subscribeToLocation: (tripId, callback) => {},
  }
  ```

#### Service: Bookings.js
- [ ] Criar arquivo `src/services/bookings.js`:
  ```javascript
  export const bookingService = {
    createBooking: async (tripId, passengerData) => {},
    getBookings: async (passengerId) => {},
    getBookingDetails: async (bookingId) => {},
    cancelBooking: async (bookingId) => {},
    getAvailableSeats: async (tripId) => {},
    confirmBooking: async (bookingId) => {},
  }
  ```

#### Service: Routes.js
- [ ] Criar arquivo `src/services/routes.js`:
  ```javascript
  export const routeService = {
    createRoute: async (driverData) => {},
    getRoutes: async (filters) => {},
    getDriverRoutes: async (driverId) => {},
    searchRoutes: async (origin, destination, date) => {},
    updateRoute: async (routeId, data) => {},
  }
  ```

---

# FASE 2: FRONTEND BÁSICO
## 🎨 Estrutura e Componentes Base (5-7 dias)

### Componentes Comuns

#### Button.jsx
- [x] Criar com variantes: `primary`, `secondary`, `danger`, `ghost`
- [x] Estados: `default`, `hover`, `active`, `disabled`, `loading`
- [x] Tamanhos: `sm`, `md`, `lg`
- [x] Suportar `isLoading` com spinner
- [x] Responsive e acessível (aria labels)

#### Input.jsx
- [x] Criar com variantes de campo
- [x] Suportar: `text`, `email`, `password`, `number`, `tel`
- [x] Estados de validação (error, success)
- [x] Labels e helper text
- [x] Mobile-first (toque em inputs)
- [x] Acessibilidade (label associations)

#### Card.jsx
- [x] Container flexível com estilo padrão
- [x] Padding consistente
- [x] Sombra e border-radius
- [x] Suporte a variants

#### Modal.jsx
- [ ] Modal acessível com backdrop
- [ ] Fechamento via ESC ou botão
- [ ] Focus trap
- [ ] Animação suave

#### Loading.jsx
- [ ] Spinner animado
- [ ] Skeleton loaders para listas
- [ ] Estados de carregamento

#### Header.jsx
- [x] Navegação responsiva
- [x] Logo + Menu
- [x] User menu (dropdown)
- [x] Mobile: hamburger menu

#### Footer.jsx
- [x] Links úteis
- [x] Copyright
- [x] Info de contato

#### ErrorBoundary.jsx
- [ ] Capturar erros de componentes
- [ ] Mostrar UI amigável
- [ ] Log de erros

### Layouts

#### MainLayout.jsx
- [x] Header com navegação
- [x] Main content area
- [x] Footer
- [x] Sidebar com menu (mobile: drawer)
- [x] Padrão responsivo

#### PassengerLayout.jsx
- [x] Estendido de MainLayout
- [x] Menu passenger-specific
- [x] Quick access buttons

#### DriverLayout.jsx
- [x] Estendido de MainLayout
- [x] Menu driver-specific
- [x] Status indicator

### Hooks Customizados

#### useAuth.js
- [ ] `useAuth()` retorna: `user`, `isLoading`, `error`, `signIn`, `signUp`, `signOut`
- [ ] Persistência automática
- [ ] Sincronização com Supabase Auth

#### useLocation.js
- [ ] `useLocation()` retorna: `location`, `isLoading`, `error`, `startTracking`, `stopTracking`
- [ ] Geolocalização com permissões
- [ ] Accuracy checks

#### useTrip.js
- [ ] `useTrip(tripId)` retorna: `trip`, `isLoading`, `error`
- [ ] Real-time subscription
- [ ] Auto-refresh

#### useBooking.js
- [ ] `useBooking(bookingId)` retorna booking info
- [ ] Status updates em tempo real

#### useMap.js
- [ ] `useMap()` inicializa Leaflet
- [ ] Marker management
- [ ] Zoom/pan helpers

### Stores Zustand

#### authStore.js
```javascript
export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  signIn: async (email, password) => {},
  signUp: async (data) => {},
  signOut: async () => {},
  setUser: (user) => set({ user }),
  // ... outros métodos
}))
```

#### tripStore.js
```javascript
export const useTripStore = create((set) => ({
  trips: [],
  selectedTrip: null,
  isLoading: false,
  fetchTrips: async (filters) => {},
  setSelectedTrip: (trip) => set({ selectedTrip: trip }),
  // ... outros métodos
}))
```

#### bookingStore.js
```javascript
export const useBookingStore = create((set) => ({
  bookings: [],
  selectedSeats: [],
  isLoading: false,
  fetchBookings: async () => {},
  toggleSeat: (seatNumber) => {},
  // ... outros métodos
}))
```

#### locationStore.js
```javascript
export const useLocationStore = create((set) => ({
  driverLocation: null,
  driverLocations: [],
  isTracking: false,
  updateLocation: (lat, lng) => {},
  startTracking: () => {},
  stopTracking: () => {},
}))
```

### Pages Estrutura

#### App.jsx (Routing)
- [x] Configurar React Router v6
- [x] Rotas públicas:
  - [x] `/` - Home/Landing
  - [x] `/login` - Login
  - [x] `/signup` - Cadastro
  - [x] `/404` - Página não encontrada
- [x] Rotas protegidas (Passageiro):
  - [x] `/passenger/dashboard` - Dashboard
  - [x] `/passenger/search` - Buscar viagens
  - [x] `/passenger/booking/:tripId` - Reserva
  - [x] `/passenger/my-bookings` - Minhas reservas
  - [x] `/passenger/tracking/:tripId` - Rastreamento
  - [x] `/passenger/profile` - Perfil
- [x] Rotas protegidas (Motorista):
  - [x] `/driver/dashboard` - Dashboard
  - [x] `/driver/routes` - Minhas rotas
  - [x] `/driver/trips` - Minhas viagens
  - [x] `/driver/trip/:tripId/manage` - Gerenciar viagem
  - [x] `/driver/profile` - Perfil

#### Login.jsx
- [ ] Form com email + senha
- [ ] Validação
- [ ] Link "Cadastre-se"
- [ ] Loading state
- [ ] Error handling
- [ ] Responsivo

#### Signup.jsx
- [ ] Form multi-step (se necessário)
- [ ] Seleção de tipo (passageiro/motorista)
- [ ] Validação de dados
- [ ] Confirmação de email
- [ ] Responsivo

#### Home.jsx
- [x] Hero section
- [x] Features principais
- [x] Call-to-action
- [x] Links para login/signup

### Estilos CSS Modules

#### App.module.css
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.main {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: var(--spacing-lg);
}
```

#### responsive.css
```css
/* Mobile First */
/* ... */

@media (min-width: 768px) {
  /* Tablet */
}

@media (min-width: 1024px) {
  /* Desktop */
}
```

### Testes Básicos
- [ ] Configurar Jest + React Testing Library
- [ ] Teste de renderização dos componentes principais
- [ ] Teste de navegação entre páginas

---

# FASE 3: FUNCIONALIDADES CORE
## 🔧 Lógica Principal (7-10 dias)

### Autenticação Completa

#### Login Page
- [ ] Form com validação Zod
- [ ] Integração com `authService.signIn()`
- [ ] Error messages
- [ ] Remember me (opcional)
- [ ] Link "Esqueceu senha?"
- [ ] Redirecionar para dashboard após login
- [ ] Mobile responsivo

#### Signup Page - Passageiro
- [ ] Step 1: Email + Senha
- [ ] Step 2: Nome + Telefone
- [ ] Step 3: Endereço completo
- [ ] Validação em cada step
- [ ] Confirmação de email (opcional)
- [ ] Criar usuário no Supabase Auth
- [ ] Criar profile na tabela `users`
- [ ] Auto-login após signup

#### Signup Page - Motorista
- [ ] Steps adicionais:
  - [ ] Documentos (CNH, RG, Comprovante de endereço)
  - [ ] Dados do veículo (placa, modelo, cor)
  - [ ] Informações da rota (origem, destino)
- [ ] Verificação manual (admin)
- [ ] Status "pendente verificação"

#### Password Recovery
- [ ] Email para reset de senha
- [ ] Link seguro com token
- [ ] Form para nova senha

### Dashboard Passageiro

#### Passenger Dashboard
- [ ] Display do usuário logado
- [ ] Quick action buttons:
  - [ ] "Buscar viagem" (destaque)
  - [ ] "Minhas reservas"
  - [ ] "Rastrear viagem em progresso"
- [ ] Card com próxima viagem (se houver)
- [ ] Histórico de viagens recentes
- [ ] Perfil resumido
- [ ] Notificações (futuros)

#### Search Trips
- [ ] Form de busca:
  - [ ] Origem (autocomplete de cidades)
  - [ ] Destino (autocomplete)
  - [ ] Data (date picker)
- [ ] Resultados como lista de cards
- [ ] Card exibe:
  - [ ] Origem → Destino
  - [ ] Horário saída → chegada
  - [ ] Preço
  - [ ] Vagas disponíveis
  - [ ] Rating do motorista
  - [ ] Botão "Reservar"
- [ ] Filtros avançados (opcional):
  - [ ] Preço máximo
  - [ ] Horário preferido
  - [ ] Avaliação mínima
- [ ] Responsivo com scroll horizontal (mobile)

#### My Bookings
- [ ] Lista todas as reservas do usuário
- [ ] Filtros por status: pendentes, confirmadas, passadas
- [ ] Card por reserva com:
  - [ ] Rota (origem → destino)
  - [ ] Data e hora
  - [ ] Assento número
  - [ ] Status
  - [ ] Preço
  - [ ] Botões de ação (cancelar se permitido, rastrear se ativa)
- [ ] Sem reservas? Mostrar empty state com link para buscar

#### Passenger Profile
- [ ] Display de informações:
  - [ ] Nome, email, telefone
  - [ ] Endereço
  - [ ] Avatar
- [ ] Editar perfil
- [ ] Histórico de pagamentos
- [ ] Avaliações dadas
- [ ] Botão logout

### Dashboard Motorista

#### Driver Dashboard
- [ ] Status do motorista (online/offline/em viagem)
- [ ] Card com viagem em progresso (se houver)
- [ ] Próximas viagens agendadas (próximos 7 dias)
- [ ] Quick stats:
  - [ ] Total de viagens esta semana
  - [ ] Ganho até agora
  - [ ] Avaliação média
- [ ] Botões rápidos:
  - [ ] "Iniciar viagem"
  - [ ] "Minhas rotas"
  - [ ] "Gerenciar reservas"

#### Manage Trip (Durante a viagem)
- [ ] Mapa com rota marcada
- [ ] Status atual da viagem
- [ ] Botões:
  - [ ] "Iniciar viagem" (no começo)
  - [ ] "Marcar como chegado" (no final)
  - [ ] "Cancelar viagem" (emergência)
- [ ] Lista de passageiros:
  - [ ] Nome
  - [ ] Assento
  - [ ] Status (pendente, confirmado, check-in)
  - [ ] Botão "Check-in" para cada passageiro
- [ ] Botão atualizar localização (manual, se necessário)
- [ ] Chat com suporte (futura)

#### My Routes
- [ ] Lista de rotas cadastradas
- [ ] Card por rota:
  - [ ] Origem → Destino
  - [ ] Horários (dias da semana)
  - [ ] Vagas totais
  - [ ] Preço
  - [ ] Status (ativo/inativo)
  - [ ] Botões: Editar, Ver viagens, Ativar/Desativar
- [ ] Botão "Criar nova rota"

#### Create/Edit Route
- [ ] Form:
  - [ ] Origem (cidade)
  - [ ] Destino (cidade)
  - [ ] Coordenadas (auto-fetch de API de geocoding)
  - [ ] Total de assentos
  - [ ] Preço por assento
  - [ ] Tempo estimado de viagem
  - [ ] Dados do veículo (placa, modelo, cor)
  - [ ] Horários (dia da semana + hora saída/chegada)
- [ ] Validação
- [ ] Salvar em banco

#### Driver Profile
- [ ] Dados pessoais editáveis
- [ ] Dados do veículo
- [ ] Histórico de viagens
- [ ] Avaliações recebidas
- [ ] Documentos (visualizar/reuplocar)

### Booking (Reserva de Assentos)

#### Booking Page
- [ ] Display da rota:
  - [ ] Origem → Destino
  - [ ] Data e hora
  - [ ] Duração estimada
  - [ ] Preço por assento
- [ ] Visualização dos assentos:
  - [ ] Layout do ônibus (2 colunas)
  - [ ] Assentos disponíveis (verde)
  - [ ] Assentos ocupados (cinza)
  - [ ] Assentos selecionados (azul)
  - [ ] Click para selecionar/desselecionar
- [ ] Número de assentos selecionados
- [ ] Preço total calculado
- [ ] Informações do passageiro:
  - [ ] Nome
  - [ ] Telefone (pré-preenchido)
- [ ] Botões:
  - [ ] "Continuar para pagamento"
  - [ ] "Cancelar"
- [ ] Responsivo com scroll vertical dos assentos (mobile)

#### Booking Confirmation
- [ ] Resumo da reserva:
  - [ ] Rota
  - [ ] Data/Hora
  - [ ] Assentos
  - [ ] Preço total
  - [ ] Método de pagamento selecionado
- [ ] Booking ID para referência
- [ ] Status: "Pendente confirmação"
- [ ] Botão "Voltar para home"
- [ ] Email com detalhes (opcional)

### Payment Integration (Básico)

#### Payment Method Selection
- [ ] Opções de pagamento:
  - [ ] [ ] PIX (código gerado)
  - [ ] [ ] QR Code (imagem exibida)
  - [ ] [ ] Dinheiro (com instruções)
  - [ ] [ ] WhatsApp (link para contato)
- [ ] Descrição de cada método
- [ ] Seleção com radio buttons

#### PIX/QR Code Display
- [ ] QR Code gerado (com qrcode.react)
- [ ] Código PIX copiável (com botão copy)
- [ ] Instruções para pagamento
- [ ] Tempo de expiração (opcional)

#### Payment Status
- [ ] Atualizar status da reserva após pagamento
- [ ] Confirmação visual
- [ ] Link para rastrear viagem (se viagem já iniciou)

### Real-time Reservas Updates
- [ ] Quando motorista confirma reserva → notificar passageiro
- [ ] Quando passageiro faz reserva → notificar motorista
- [ ] Atualizar assentos disponíveis em tempo real na UI

---

# FASE 4: TRACKING EM TEMPO REAL
## 📍 Rastreamento do Motorista (3-5 dias)

### Map Integration

#### Leaflet Setup
- [x] Instalar Leaflet e react-leaflet
- [x] Criar componente `MapComponent.jsx`:
  ```javascript
  const MapComponent = ({ center, zoom, markers }) => {
    return (
      <MapContainer center={center} zoom={zoom} style={{ height: '100%' }}>
        <TileLayer url={osmUrl} />
        {markers.map(m => <Marker key={m.id} position={m.pos} popup={m.label} />)}
      </MapContainer>
    )
  }
  ```
- [x] Estilos para mapa responsivo
- [x] Considerar OpenStreetMap (gratuito)

#### Track Trip Page (Passageiro)
- [x] URL: `/passenger/tracking/:tripId`
- [x] Mapa full-screen (80-90% da altura)
- [x] Marcadores:
  - [x] Origem (casa icon)
  - [x] Destino (flag icon)
  - [x] Posição atual do motorista (bus icon)
- [x] Linha da rota (polyline do Leaflet)
- [x] Painel de informações no rodapé:
  - [x] "Motorista está a X km"
  - [x] ETA (estimated time of arrival)
  - [x] Velocidade atual (opcional)
  - [x] Status "Em viagem"
- [x] Real-time updates (Supabase Realtime):
  - [x] Subscribe a `driver_locations` para `tripId`
  - [x] Atualizar posição a cada atualização
  - [x] Auto-center no ônibus

#### Driver Location Updates
- [ ] Geolocalização ativa durante viagem:
  - [ ] Usar `watchPosition()` API nativa
  - [ ] Atualizar a cada 10-30 segundos (balance: precisão vs bateria)
  - [ ] Parar de atualizar quando viagem termina
- [ ] Inserir em `driver_locations` table
- [ ] Atualizar `trips.driver_current_lat/lng`
- [ ] Validação de accuracy (ignorar updates ruins)

#### UI de Rastreamento
- [ ] Notificação quando motorista está próximo (ex: 500m)
- [ ] Botão "Chamar motorista" (link WhatsApp futura)
- [ ] Botão "Reportar problema" (suporte)

### Realtime Subscriptions

#### Setup Realtime
- [ ] Criar hook `useLocationSubscription`:
  ```javascript
  export const useLocationSubscription = (tripId) => {
    useEffect(() => {
      const subscription = supabase
        .from('driver_locations')
        .on('*', payload => {
          // Atualizar localização
        })
        .subscribe()
      
      return () => subscription.unsubscribe()
    }, [tripId])
  }
  ```

#### ETA Calculation
- [ ] Calcular distância restante (Haversine formula ou API de rotas)
- [ ] Estimar tempo baseado em velocidade média
- [ ] Atualizar a cada atualização de localização
- [ ] Mostrar na UI

### Push Notifications (Futuro, MVP opcional)
- [ ] Se implementar: usar OneSignal ou Firebase Cloud Messaging
- [ ] Notificar passageiro quando:
  - [ ] Motorista está próximo
  - [ ] Viagem iniciou
  - [ ] Viagem concluída

---

# FASE 5: PAGAMENTOS & INTEGRAÇÃO
## 💳 Sistema de Pagamentos (2-4 dias)

### PIX Integration

#### Generate PIX Code
- [ ] Integrar com API de PIX (Pix API: bcb.gov.br)
- [ ] OU usar serviço de terceiro (Asaas, EFI, PayPal, etc.)
- [ ] Gerar código PIX dinâmico por booking
- [ ] Salvar em `payments.pix_code`
- [ ] Validação de timeout (ex: 30 minutos)

#### QR Code Display
- [ ] Biblioteca: `qrcode.react`
- [ ] Exibir QR code gerado
- [ ] Baixar como imagem (opcional)

### Payment Status Tracking
- [ ] Webhook para confirmar pagamento PIX
- [ ] Polling manual (check payment status a cada 5 segundos)
- [ ] Atualizar `payments.status` quando confirmado
- [ ] Atualizar `bookings.payment_status` 
- [ ] Atualizar `bookings.status` para "confirmed"

### Cash Payment
- [ ] Marcar como "pendente" no sistema
- [ ] Motorista cobra no dia
- [ ] Passageiro marca como "pago" ou motorista confirma
- [ ] UI simples: "Pagamento em dinheiro - confirmar no ônibus"

### WhatsApp Payment
- [ ] Gerar link WhatsApp com mensagem:
  ```
  Olá! Preciso confirmar o pagamento da reserva [BOOKING_ID] 
  Rota: Origem → Destino | Data: XX/XX/XXXX | Assento: XX | Valor: R$ XX,XX
  ```
- [ ] Link clicável em botão
- [ ] Abrir conversa no WhatsApp
- [ ] Marcar como "à confirmar" até motorista confirmar

### Payment Service
- [ ] Criar `src/services/payment.js`:
  ```javascript
  export const paymentService = {
    createPayment: async (bookingId, method) => {},
    generatePixCode: async (amount) => {},
    checkPaymentStatus: async (paymentId) => {},
    completePayment: async (paymentId) => {},
    refundPayment: async (paymentId) => {},
  }
  ```

### Refund Logic
- [ ] Se cancelamento dentro de prazo:
  - [ ] [ ] PIX: reverter automaticamente
  - [ ] [ ] Dinheiro: reembolso manual
  - [ ] [ ] WhatsApp: gerar link de devolução

---

# FASE 6: PAINEL DO MOTORISTA
## 🚗 Driver Management System (3-5 dias)

### Trip Management

#### Start Trip
- [ ] Botão "Iniciar viagem"
- [ ] Confirmar horário
- [ ] Iniciar tracking de localização
- [ ] Mudar status para "in_progress"
- [ ] Notificar todos os passageiros

#### End Trip
- [ ] Botão "Finalizar viagem"
- [ ] Confirmar localização
- [ ] Parar tracking
- [ ] Mudar status para "completed"
- [ ] Mostrar resumo de ganhos
- [ ] Notificar passageiros

#### Passenger Management
- [ ] Lista de passageiros com reserva confirmada
- [ ] Check-in: marcar presença
  - [ ] Click em botão "Check-in"
  - [ ] Mudar status para "checked_in"
  - [ ] Notificar passageiro
- [ ] Gerenciar ausências:
  - [ ] Se passageiro não aparece, marcar como "no-show"
  - [ ] Manter em histórico

#### Trip Cancellation
- [ ] Botão "Cancelar viagem" (se necessário)
- [ ] Reembolsar passageiros automaticamente
- [ ] Notificar todos os passageiros
- [ ] Registrar motivo

### Route Management

#### View Routes
- [ ] Lista de rotas cadastradas
- [ ] Filtros: ativas/inativas
- [ ] Card com:
  - [ ] Origem/Destino
  - [ ] Horários
  - [ ] Próxima viagem
  - [ ] Total de viagens este mês
  - [ ] Ganho total

#### Create Route
- [ ] Form robusto com:
  - [ ] Geocoding para origem/destino
  - [ ] Seleção de múltiplos horários (dias da semana)
  - [ ] Dados de veículo
  - [ ] Preview da rota no mapa
- [ ] Validação
- [ ] Confirmação antes de criar

#### Edit Route
- [ ] Mesmos campos de criação
- [ ] Não permitir editar se houver viagens ativas

### Earnings & Analytics

#### Earnings Dashboard
- [ ] Total ganho (all time)
- [ ] Ganho este mês
- [ ] Ganho esta semana
- [ ] Gráfico de ganhos por dia (últimos 30 dias)
- [ ] Número de viagens
- [ ] Assento médio preenchido

#### Trip History
- [ ] Lista de todas as viagens completadas
- [ ] Card por viagem:
  - [ ] Data/Hora
  - [ ] Rota
  - [ ] Assentos vendidos
  - [ ] Ganho bruto
  - [ ] Detalhes (click para expandir)

### Driver Status Management

#### Online/Offline Toggle
- [ ] Switch simples: "Online" / "Offline"
- [ ] Mostrar status atual
- [ ] Quando offline, não aparecer em buscas

#### Availability
- [ ] Próximas viagens (próximos 7 dias)
- [ ] Status automático baseado em viagens
- [ ] Alertas para viagens chegando (ex: 1 hora antes)

---

# FASE 7: TESTES & OTIMIZAÇÃO
## ✅ Qualidade & Performance (2-3 dias)

### Testes Unitários
- [ ] Configurar Jest + React Testing Library
- [ ] Testes para componentes principais:
  - [ ] Button, Input, Card
  - [ ] Login form
  - [ ] Search trips form
  - [ ] Seat selection
- [ ] Testes para serviços:
  - [ ] Auth service mocks
  - [ ] API calls
- [ ] Coverage mínimo: 70%

### Testes de Integração
- [ ] Fluxo completo de login
- [ ] Fluxo completo de reserva
- [ ] Fluxo de pagamento
- [ ] Real-time updates

### Testes de Acesso (Accessibility)
- [ ] Axe audit em principais páginas
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Screen reader compatibility
- [ ] Contrast ratio (WCAG AA mínimo)
- [ ] Semântica HTML

### Testes Mobile
- [ ] Responsividade em:
  - [ ] 320px (iPhone SE)
  - [ ] 375px (iPhone X)
  - [ ] 414px (iPhone Plus)
  - [ ] 768px (iPad)
- [ ] Touch interactions
- [ ] Orientação (portrait/landscape)
- [ ] Performance em rede lenta (3G)

### Performance
- [ ] Lighthouse audit (target: 90+)
- [ ] Bundle size analysis
  ```bash
  npm run build
  npm install -g serve
  serve -s dist
  ```
- [ ] Lazy loading de rotas
  ```javascript
  const Dashboard = lazy(() => import('./pages/Dashboard'))
  ```
- [ ] Code splitting automático
- [ ] Otimizar imagens (converter para WebP)
- [ ] Minificar CSS/JS
- [ ] Gzip compression

### SEO (Básico)
- [ ] Meta tags (title, description)
- [ ] Open Graph para social sharing
- [ ] Robots.txt
- [ ] Sitemap.xml
- [ ] Estrutura semântica

### Segurança
- [ ] HTTPS obrigatório
- [ ] Validação de input no front e back
- [ ] CSRF protection (se necessário)
- [ ] Rate limiting (backend)
- [ ] Sanitizar outputs
- [ ] Environment variables nunca expostos

### Cross-browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (Chrome, Safari)

### Bug Fixes
- [ ] Listar bugs encontrados durante testes
- [ ] Priorizar por severidade
- [ ] Corrigir antes de deploy

---

# FASE 8: DEPLOY & GO-LIVE
## 🚀 Publicação (1-2 dias)

### Pré-deploy Checklist

#### Código
- [ ] Todos os branches merged para `main`
- [ ] Sem console.log em código de produção
- [ ] Sem hardcoded URLs/secrets
- [ ] TypeScript/ESLint sem erros críticos (se usado)

#### Variáveis de Ambiente
- [ ] `.env.production` configurado
- [ ] `VITE_SUPABASE_URL` correto
- [ ] `VITE_SUPABASE_ANON_KEY` correto
- [ ] Nenhuma chave secreta do lado do cliente
- [ ] URLs de API apontando para produção

#### Banco de Dados
- [ ] Migrations criadas e testadas
- [ ] Backups configurados no Supabase
- [ ] RLS policies verificadas
- [ ] Índices criados para performance
- [ ] Backups automáticos ativados

#### Frontend
- [ ] Build local testado
  ```bash
  npm run build
  npm run preview
  ```
- [ ] Sem erros de compilação
- [ ] Sem warnings críticos
- [ ] Assets otimizados
- [ ] Mapa funcionando
- [ ] Localização funcionando

### Deploy no Vercel

#### Setup Inicial
- [ ] Criar conta no Vercel (gratuita)
- [ ] Conectar repositório GitHub
- [ ] Autorizar Vercel para acessar repo

#### Configuração do Projeto
- [ ] Projeto Vite selecionado corretamente
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables adicionadas:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

#### Deploy
- [ ] Fazer push para `main` branch
- [ ] Vercel detecta e auto-deploya
- [ ] Esperar build completar (~2-3 minutos)
- [ ] Preview URL fornecida
- [ ] Testar em preview URL
- [ ] Promover para produção

#### Domain Setup (Opcional)
- [ ] Registrar domínio (Namecheap, GoDaddy, etc.)
- [ ] Adicionar domínio no Vercel
- [ ] Configurar DNS (CNAME)
- [ ] Esperar propagação (~24h)
- [ ] Testar em domínio final

### DNS & Email (Opcional)
- [ ] Se tiver domínio:
  - [ ] Email do domínio (Gmail domain, Proton, etc.)
  - [ ] SPF, DKIM, DMARC records

### Monitoramento
- [ ] Configurar Vercel Analytics
  - [ ] Web Vitals
  - [ ] Performance tracking
- [ ] Error logging (Sentry, LogRocket, etc.)
  - [ ] Capturar erros em produção
  - [ ] Alertas para erros críticos
- [ ] Monitoring de uptime (UptimeRobot, etc.)
- [ ] Google Analytics (opcional)

### Post-deploy Checklist
- [ ] [ ] Homepage carrega rápido
- [ ] [ ] Login funciona
- [ ] [ ] Signup funciona
- [ ] [ ] Busca de viagens funciona
- [ ] [ ] Mapa carrega corretamente
- [ ] [ ] Real-time updates funcionam
- [ ] [ ] Pagamentos funcionam
- [ ] [ ] Responsividade OK no mobile
- [ ] [ ] Nenhum erro no console
- [ ] [ ] Performance aceitável

### Suporte & Documentação

#### Documentação para Usuários
- [ ] FAQ público (markdown)
- [ ] Guia de como reservar (passos com screenshots)
- [ ] Guia para motorista
- [ ] Política de cancelamento
- [ ] Termos de uso
- [ ] Privacidade

#### Documentação para Dev
- [ ] Atualizar README.md
  - [ ] Como instalar localmente
  - [ ] Como fazer deploy
  - [ ] Troubleshooting comum
- [ ] Criar CONTRIBUTING.md
- [ ] Documentar API endpoints (se houver custom backend)
- [ ] Criar DEPLOYMENT.md com passo a passo

#### Suporte ao Usuário
- [ ] Email de contato: suporte@pabviagens.com.br
- [ ] WhatsApp para suporte (opcional)
- [ ] Formulário de feedback no app

---

# FASE 9: PÓS-LANÇAMENTO (ITERAÇÃO)
## 📈 Melhorias Contínuas

### Primeiras 2 Semanas
- [ ] Monitorar erros em produção
- [ ] Coletar feedback de usuários
- [ ] Fixar bugs críticos imediatamente
- [ ] Otimizar performance se necessário
- [ ] Responder a todas as dúvidas

### Primeira Semana - Checklist de Bugs
- [ ] Verificar Sentry/LogRocket diariamente
- [ ] Testar em múltiplos dispositivos
- [ ] Testar em rede lenta
- [ ] Testar com dados reais
- [ ] Feedback de primeiros usuários

### Melhorias Rápidas (Próximas 2-4 semanas)
- [ ] Adicionar push notifications (se houver demanda)
- [ ] Melhorar UX baseado em feedback
- [ ] Adicionar funcionalidades minor (sugestões dos usuários)
- [ ] Otimizar conversão (taxa de reservas)

### Funcionalidades Futuras (Priorizar conforme feedback)
- [ ] Múltiplos motoristas
- [ ] Sistema de avaliações robusto
- [ ] Chat interno
- [ ] Integração com múltiplos gateways de pagamento
- [ ] Admin dashboard (gerenciar usuários, viagens, pagamentos)

---

# CHECKLIST GERAL RÁPIDO (TL;DR)

## Fase 0: Preparação (✓ quando completado)
- [ ] Node.js + npm instalados
- [ ] Projeto Vite + React criado
- [ ] Dependências core instaladas
- [ ] Estrutura de pastas criada
- [ ] Git configurado
- [ ] Supabase account criado

## Fase 1: Backend (✓ quando completado)
- [ ] 8 tabelas SQL criadas e testadas
- [ ] RLS policies configuradas
- [ ] Realtime habilitado para tabelas necessárias
- [ ] 5 services criados (auth, trips, bookings, routes, payment)
- [ ] Índices de performance adicionados

## Fase 2: Frontend Base (✓ quando completado)
- [ ] 8+ componentes reutilizáveis criados
- [ ] 2 layouts principais criados
- [ ] 4 stores Zustand funcionando
- [ ] 4 hooks customizados implementados
- [ ] Router com 15+ rotas configurado
- [ ] Estilos globais e responsivos aplicados

## Fase 3: Core Features (✓ quando completado)
- [ ] Login/Signup completo
- [ ] Dashboard Passageiro funcional
- [ ] Dashboard Motorista funcional
- [ ] Busca de viagens
- [ ] Seleção e reserva de assentos
- [ ] Meu histórico de reservas
- [ ] Gerenciamento de rotas (driver)

## Fase 4: Tracking (✓ quando completado)
- [ ] Mapa com Leaflet integrado
- [ ] Geolocalização funcionando
- [ ] Real-time location updates
- [ ] Track Trip page para passageiros
- [ ] Realtime subscriptions via Supabase

## Fase 5: Pagamentos (✓ quando completado)
- [ ] PIX code generation
- [ ] QR code display
- [ ] Cash payment flow
- [ ] WhatsApp payment links
- [ ] Payment status tracking
- [ ] Refund logic

## Fase 6: Driver Panel (✓ quando completado)
- [ ] Start/End trip functionality
- [ ] Passenger management (check-in)
- [ ] Trip cancellation
- [ ] Earnings dashboard
- [ ] Trip history
- [ ] Route management

## Fase 7: Testes & Otimização (✓ quando completado)
- [ ] Unit tests para componentes
- [ ] Integration tests
- [ ] Accessibility audit
- [ ] Mobile responsiveness tested
- [ ] Performance optimized (Lighthouse 90+)
- [ ] Cross-browser tested
- [ ] Security reviewed

## Fase 8: Deploy (✓ quando completado)
- [ ] Vercel setup completo
- [ ] Domain configured (se houver)
- [ ] Environment variables set
- [ ] Database backups ativados
- [ ] Monitoring/Analytics ativados
- [ ] Documentação escrita
- [ ] Support channels estabelecidos

---

# TEMPO TOTAL ESTIMADO

| Fase | Dias | Status |
|------|------|--------|
| 0 - Preparação | 1-2 | |
| 1 - Backend | 3-5 | |
| 2 - Frontend Base | 5-7 | |
| 3 - Core Features | 7-10 | |
| 4 - Tracking | 3-5 | |
| 5 - Pagamentos | 2-4 | |
| 6 - Driver Panel | 3-5 | |
| 7 - Testes & Otimização | 2-3 | |
| 8 - Deploy | 1-2 | |
| **TOTAL** | **27-43 dias** | |

**MVP realista: 4-6 semanas de trabalho full-time**

---

# DICAS IMPORTANTES

## Evitar Armadilhas Comuns
- [ ] Não comece pelo painel admin (não é prioritário)
- [ ] Não implemente múltiplos motoristas logo de início
- [ ] Não faça otimizações prematuras
- [ ] Não customize para cada user individual (MVP é padrão)
- [ ] Não adicione muitas integrações no início

## Acelerar Desenvolvimento
- [ ] Use templates/starters quando possível
- [ ] Reutilize componentes ao máximo
- [ ] Tenha um design system claro desde o início
- [ ] Teste incrementalmente (não deixa para o final)
- [ ] Deploy cedo e frequente

## Manter Qualidade
- [ ] Code reviews mesmo que seja só você
- [ ] Teste manualmente cada feature
- [ ] Peça feedback de amigos/beta users
- [ ] Use linter (ESLint) e formatter (Prettier)
- [ ] Documente decisões importantes

## Comunicação com Motorista/Usuários
- [ ] Teste com usuários reais no Fase 7
- [ ] Coleta feedback contínuo
- [ ] Tenha canal de comunicação ativo
- [ ] Responda rápido a bugs críticos
- [ ] Celebre cada milestone!

---

# SCRIPTS ÚTEIS

Adicione ao `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .jsx,.js",
    "format": "prettier --write src",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "coverage": "vitest --coverage",
    "type-check": "tsc --noEmit"
  }
}
```

---

# CONTATOS & RECURSOS

## Documentação
- Supabase: https://supabase.com/docs
- React: https://react.dev
- Vite: https://vitejs.dev
- Leaflet: https://leafletjs.com
- Zustand: https://github.com/pmndrs/zustand

## Ferramentas
- Vercel: https://vercel.com
- GitHub: https://github.com
- VS Code: https://code.visualstudio.com
- Figma: https://figma.com (design)
- Lighthouse: Chrome DevTools

---

**Última atualização: Maio 2026**
