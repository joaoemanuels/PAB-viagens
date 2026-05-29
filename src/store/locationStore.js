export const useLocationStore = create((set) => ({
  driverLocation: null,
  driverLocations: [],
  isTracking: false,
  updateLocation: (lat, lng) => {},
  startTracking: () => {},
  stopTracking: () => {},
}));
