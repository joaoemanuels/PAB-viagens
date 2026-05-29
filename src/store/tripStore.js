export const useTripStore = create((set) => ({
  trips: [],
  selectedTrip: null,
  isLoading: false,
  fetchTrips: async (filters) => {},
  setSelectedTrip: (trip) => set({ selectedTrip: trip }),
  // ... outros métodos
}));
