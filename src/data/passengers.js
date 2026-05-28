// data/user.js

export const passengersData = {
  id: 1,

  // Dados básicos
  fullName: "Ricardo de Oliveira Santos",
  firstName: "Ricardo",
  lastName: "Santos",

  // Contato
  email: "ricardo.santos@email.com",
  phone: "+55 (11) 98765-4321",

  // Documento
  cpf: "123.456.789-00",

  // Perfil
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg",

  // Endereço
  address: {
    street: "Rua das Palmeiras",
    number: "245",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    zipCode: "01000-000",
    country: "Brasil",
  },

  // Configurações
  settings: {
    language: "Português (Brasil)",
    notifications: true,
    darkMode: false,
  },

  // Segurança
  security: {
    twoFactorAuth: false,
    lastPasswordChange: "2026-04-12",
  },

  // Conta
  role: "Usuário",
  status: "Ativa",
  createdAt: "2025-09-15",
  lastLogin: "2026-05-28 14:32",

  // App
  appVersion: "v2.4.1",
};
