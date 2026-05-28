// data/tripsData.js

export const tripsData = [
  {
    id: "310",

    // categoria
    category: "EXECUTIVO",
    type: "EXECUTIVO 310",
    isExecutive: true,

    // rota
    route: "São Paulo → Campinas",
    origin: "São Paulo",
    destination: "Campinas",

    // viagem
    date: "2026-10-15",
    departure: "14:30",
    arrival: "16:00",
    duration: "1h 30min",

    // preço
    price: 45.9,

    // vagas
    seatsRemaining: 4,

    // detalhes
    hasDetails: true,

    // paradas
    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Terminal Tietê",
        time: "14:30",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Rodoviária Jundiaí",
        time: "15:15",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Campinas Centro",
        time: "16:00",
      },
    ],
  },

  {
    id: "102",

    category: "CONVENCIONAL",
    type: "CONVENCIONAL 102",
    isExecutive: false,

    route: "Campinas → Sorocaba",
    origin: "Campinas",
    destination: "Sorocaba",

    date: "2026-10-16",
    departure: "17:00",
    arrival: "18:45",
    duration: "1h 45min",

    price: 38.5,

    seatsRemaining: 7,

    hasDetails: false,

    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Terminal Campinas",
        time: "17:00",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Sorocaba Rodoviária",
        time: "18:45",
      },
    ],
  },

  {
    id: "221",

    category: "LEITO",
    type: "LEITO 221",
    isExecutive: true,

    route: "Recife → João Pessoa",
    origin: "Recife",
    destination: "João Pessoa",

    date: "2026-10-17",
    departure: "08:15",
    arrival: "10:40",
    duration: "2h 25min",

    price: 79.9,

    seatsRemaining: 2,

    hasDetails: true,

    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "TIP Recife",
        time: "08:15",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Goiana",
        time: "09:10",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Rodoviária João Pessoa",
        time: "10:40",
      },
    ],
  },

  {
    id: "408",

    category: "SEMI-LEITO",
    type: "SEMI-LEITO 408",
    isExecutive: true,

    route: "Curitiba → Florianópolis",
    origin: "Curitiba",
    destination: "Florianópolis",

    date: "2026-10-18",
    departure: "06:20",
    arrival: "10:10",
    duration: "3h 50min",

    price: 69.9,

    seatsRemaining: 3,

    hasDetails: true,

    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Rodoferroviária Curitiba",
        time: "06:20",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Joinville Terminal",
        time: "08:15",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Terminal Florianópolis",
        time: "10:10",
      },
    ],
  },

  {
    id: "550",

    category: "CONVENCIONAL",
    type: "CONVENCIONAL 550",
    isExecutive: false,

    route: "Fortaleza → Natal",
    origin: "Fortaleza",
    destination: "Natal",

    date: "2026-10-19",
    departure: "19:45",
    arrival: "04:30",
    duration: "8h 45min",

    price: 59.9,

    seatsRemaining: 8,

    hasDetails: true,

    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Rodoviária Fortaleza",
        time: "19:45",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Mossoró Terminal",
        time: "01:10",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Rodoviária Natal",
        time: "04:30",
      },
    ],
  },

  {
    id: "777",

    category: "EXECUTIVO",
    type: "EXECUTIVO 777",
    isExecutive: true,

    route: "João Pessoa → Campina Grande",
    origin: "João Pessoa",
    destination: "Campina Grande",

    date: "2026-10-20",
    departure: "13:00",
    arrival: "15:10",
    duration: "2h 10min",

    price: 34.9,

    seatsRemaining: 5,

    hasDetails: true,

    stops: [
      {
        type: "departure",
        label: "Partida",
        location: "Terminal João Pessoa",
        time: "13:00",
      },
      {
        type: "connection",
        label: "Conexão",
        location: "Santa Rita",
        time: "13:40",
      },
      {
        type: "arrival",
        label: "Chegada",
        location: "Terminal Argemiro de Figueiredo",
        time: "15:10",
      },
    ],
  },
];
