export const useBookingStore = create((set) => ({
  bookings: [],
  selectedSeats: [],
  isLoading: false,
  fetchBookings: async () => {},
  toggleSeat: (seatNumber) => {},
  // ... outros métodos
}));
