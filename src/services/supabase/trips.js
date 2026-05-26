export const tripService = {
  createTrip: async (routeId, scheduleId, departureDate) => {},
  getTripsByDate: async (departureDate) => {},
  getTripDetails: async (tripId) => {},
  updateTripStatus: async (tripId, status) => {},
  updateDriverLocation: async (tripId, lat, lng) => {},
  subscribeToTrip: (tripId, callback) => {},
  subscribeToLocation: (tripId, callback) => {},
};
