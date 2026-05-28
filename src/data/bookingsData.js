// data/bookingsData.js

export const bookingsData = [
  {
    id: "1",

    // relação com viagem
    tripId: "310",

    // status
    status: "IN_PROGRESS",
    statusLabel: "EM ANDAMENTO",

    // reserva
    bookingDate: "2026-05-28T14:00:00",

    // assentos
    seats: ["12A"],

    // pagamento
    paymentStatus: "PAID",
  },

  {
    id: "2",

    tripId: "777",

    status: "CONFIRMED",
    statusLabel: "CONFIRMADA",

    bookingDate: "2026-05-27T18:30:00",

    seats: ["08B"],

    paymentStatus: "PAID",
  },

  // histórico

  {
    id: "3",

    tripId: "102",

    status: "COMPLETED",
    statusLabel: "CONCLUÍDA",

    bookingDate: "2026-10-10T09:00:00",

    seats: ["05A"],

    paymentStatus: "PAID",
  },

  {
    id: "4",

    tripId: "310",

    status: "COMPLETED",
    statusLabel: "CONCLUÍDA",

    bookingDate: "2026-10-05T14:30:00",

    seats: ["09C"],

    paymentStatus: "PAID",
  },

  {
    id: "5",

    tripId: "221",

    status: "COMPLETED",
    statusLabel: "CONCLUÍDA",

    bookingDate: "2026-10-02T22:15:00",

    seats: ["15B"],

    paymentStatus: "PAID",
  },
];
